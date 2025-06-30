package com.example.msventa.controller;

import com.example.msventa.dto.CardDto;
import com.example.msventa.dto.ErrorResponseDto;
import com.example.msventa.dto.OrderDto;
import com.example.msventa.entity.Sale;
import com.example.msventa.feign.OrderFeign;
import com.example.msventa.service.SaleService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Sale")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @Autowired
    private OrderFeign orderFeign;

    @GetMapping
    public ResponseEntity<List<Sale>> list() {
        return ResponseEntity.ok(saleService.listar());
    }

    @PostMapping("/process/{orderId}")
    public ResponseEntity<?> processSale(
            @PathVariable Integer orderId,
            @RequestParam String paymentMethod,
            @RequestBody(required = false) CardDto cardData) {

        try {
            ResponseEntity<OrderDto> orderResponse = orderFeign.getById(orderId);

            if (orderResponse.getStatusCode().is4xxClientError() || orderResponse.getBody() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponseDto("Pedido no encontrado."));
            }

            // Validación de datos de tarjeta
            if ("TARJETA".equalsIgnoreCase(paymentMethod)) {
                if (cardData == null || cardData.getNumero() == null || cardData.getCvv() == null || cardData.getFecha() == null) {
                    return ResponseEntity.badRequest()
                            .body(new ErrorResponseDto("Los datos de la tarjeta son obligatorios para pago con tarjeta."));
                }
            }

            // Procesar venta
            Sale sale = saleService.processSale(orderId, paymentMethod);

            orderFeign.updateStatus(orderId, "PAGADO");

            return ResponseEntity.ok(sale);

        } catch (FeignException.NotFound ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponseDto("El pedido no fue encontrado en el microservicio de pedidos."));
        } catch (FeignException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponseDto("Error al comunicarse con ms-pedido: " + ex.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ErrorResponseDto("Error interno al procesar la venta: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Integer id) {
        return ResponseEntity.ok(saleService.getSaleById(id));
    }
}
