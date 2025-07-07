package com.example.msventa.service.Impl;

import com.example.msventa.dto.*;
import com.example.msventa.entity.Sale;
import com.example.msventa.feign.ClientFeign;
import com.example.msventa.feign.OrderFeign;
import com.example.msventa.feign.ProductFeign;
import com.example.msventa.repository.SaleRepository;
import com.example.msventa.service.SaleService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private OrderFeign orderFeign;

    @Autowired
    private ClientFeign clientFeign;

    @Autowired
    private ProductFeign productFeign;

    @Override
    public List<Sale> listar() {
        List<Sale> sales = saleRepository.findAll();
        enrichSales(sales); // Enriquecer ventas con la información de la orden y los productos
        return sales;
    }

    @Override
    public List<SaleDto> listarVentasPorCliente(Integer clientId) {
        List<Sale> ventas = saleRepository.findByClientId(clientId);
        System.out.println("Ventas encontradas: " + ventas.size());  // Verifica cuántas ventas se encuentran

        return ventas.stream()
                .map(sale -> new SaleDto(sale, getOrderDtoByOrderId(sale.getOrderId())))
                .collect(Collectors.toList());
    }

    // Método para enriquecer una lista de ventas con detalles de la orden
    private void enrichSales(List<Sale> sales) {
        for (Sale sale : sales) {
            enrichSale(sale);
        }
    }

    private void enrichSale(Sale sale) {
        if (sale.getOrderId() != null) {
            try {
                // Obtener los detalles de la orden desde el microservicio
                OrderDto orderDto = orderFeign.getById(sale.getOrderId());  // Aquí cambiamos a getById sin ResponseEntity

                if (orderDto != null) {
                    sale.setOrderDto(orderDto); // Asignar la orden al DTO de venta

                    // Asignar el clientId de la orden a la venta
                    if (orderDto.getClientId() != null) {
                        sale.setClientId(orderDto.getClientId()); // Asignar clientId de la orden a la venta
                    }

                    // Obtener los detalles del cliente asociado a la orden
                    ClientDto clientDto = clientFeign.findById(orderDto.getClientId());  // Cambiado para obtener ClientDto directamente
                    if (clientDto != null) {
                        orderDto.setClientDto(clientDto); // Asignar el DTO del cliente a la orden
                    } else {
                        System.out.println("⚠️ No se encontró cliente con ID: " + orderDto.getClientId());
                    }

                    // Enriquecer los detalles de la orden con los productos
                    if (orderDto.getOrderDetails() != null && !orderDto.getOrderDetails().isEmpty()) {
                        orderDto.getOrderDetails().forEach(detail -> {
                            if (detail.getProductId() != null) {
                                ProductDto productDto = productFeign.getById(detail.getProductId());  // Cambiado para obtener directamente el producto
                                if (productDto != null) {
                                    detail.setProductDto(productDto); // Asignar el DTO del producto al detalle
                                } else {
                                    System.out.println("⚠️ No se encontró el producto con ID: " + detail.getProductId());
                                }
                            }
                        });
                    }
                } else {
                    System.out.println("⚠️ No se encontró la orden con ID: " + sale.getOrderId());
                }
            } catch (FeignException e) {
                System.out.println("⚠️ Error al llamar al microservicio de pedidos: " + e.getMessage());
                sale.setOrderDto(null);  // En caso de error al enriquecer la venta
            } catch (Exception e) {
                System.out.println("⚠️ Error general al enriquecer la venta con ID " + sale.getId() + ": " + e.getMessage());
                sale.setOrderDto(null);
            }
        }
    }




    @Override
    public Sale processSale(Integer orderId, String paymentMethod, Integer clientId) {
        OrderDto orderDto = orderFeign.getById(orderId);

        if (orderDto == null) {
            throw new RuntimeException("Pedido no encontrado para el ID: " + orderId);
        }

        // Aseguramos que cada OrderDetail tenga su totalPrice calculado antes de sumarlo
        orderDto.getOrderDetails().forEach(OrderDetailDto::calculateTotalPrice);

        // Calcular el monto total de la venta
        Double totalAmount = orderDto.getOrderDetails().stream()
                .mapToDouble(OrderDetailDto::getTotalPrice)
                .sum();

        // Calcular el monto total con impuestos (18% en este caso)
        Double taxAmount = totalAmount * 0.18;
        Double totalWithTax = totalAmount + taxAmount;

        // Reducir el stock de productos en el microservicio de productos
        orderDto.getOrderDetails().forEach(detail -> {
            productFeign.reduceStock(detail.getProductId(), detail.getAmount());
        });

        // Crear la venta y asociar los datos de la orden
        Sale sale = new Sale();
        sale.setOrderId(orderId);
        sale.setTotalAmount(totalWithTax);
        sale.setPaymentMethod(paymentMethod);
        sale.setStatus("paid");
        sale.setSaleDate(LocalDateTime.now());
        sale.setOrderDto(orderDto);

        // Aquí asignas el clientId de forma segura
        sale.setClientId(clientId);

        return saleRepository.save(sale);
    }

    @Override
    public Sale getSaleById(Integer id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
    }

    @Override
    public List<Sale> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return saleRepository.findByDateRange(startDate, endDate);
    }

    @Override
    public ReportDto generateReport(LocalDateTime startDate, LocalDateTime endDate) {
        List<Sale> sales = getSalesByDateRange(startDate, endDate);

        Double totalAmount = sales.stream().mapToDouble(Sale::getTotalAmount).sum();
        Integer totalSales = sales.size();

        ReportDto reportDto = new ReportDto();
        reportDto.setTotalAmount(totalAmount);
        reportDto.setTotalSales(totalSales);
        reportDto.setSales(sales);

        return reportDto;
    }

    private OrderDto getOrderDtoByOrderId(Integer orderId) {
        return orderFeign.getById(orderId);
    }
}

