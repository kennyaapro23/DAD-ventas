package com.example.mspedido.service.impl;

import com.example.mspedido.dto.ClientDto;
import com.example.mspedido.dto.ProductDto;
import com.example.mspedido.entity.Order;
import com.example.mspedido.entity.OrderDetail;
import com.example.mspedido.feign.ClientFeign;
import com.example.mspedido.feign.ProductFeign;
import com.example.mspedido.repository.OrderRepository;
import com.example.mspedido.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductFeign productFeign;
    @Autowired
    private ClientFeign clientFeign;

    @Override
    public List<Order> list() {
        return orderRepository.findAll();
    }


    @Override
    public Optional<Order> findById(Integer id) {
        Optional<Order> orderOpt = orderRepository.findById(id);

        if (orderOpt.isEmpty()) {
            return Optional.empty();
        }

        Order order = orderOpt.get();

        // Obtener cliente via Feign
        ClientDto clientDto = clientFeign.listById(order.getClientId()).getBody();
        if (clientDto != null) {
            order.setClientDto(clientDto);
        }

        // Asignar detalles con producto y calcular totalPrice
        order.getOrderDetails().forEach(orderDetail -> {
            ProductDto productDto = productFeign.getById(orderDetail.getProductId()).getBody();
            if (productDto != null) {
                orderDetail.setProductDto(productDto);
                orderDetail.setPrice(productDto.getPrice());

                // Si amount está a 0, quizá falta asignarlo, revisa de dónde debe venir
                if (orderDetail.getAmount() == null || orderDetail.getAmount() == 0) {
                    // Asignar 1 o el valor real que corresponda, aquí solo para no dejar 0
                    orderDetail.setAmount(1.0);
                }

                orderDetail.setTotalPrice(orderDetail.getPrice() * orderDetail.getAmount());
            }
        });

        return Optional.of(order);
    }

    public Order save(Order order) {
        // Iterar sobre cada detalle del pedido y calcular el monto basado en el precio del producto y la cantidad
        order.getOrderDetails().forEach(detail -> {
            // Obtener el producto desde `ms-catalogo` utilizando Feign
            ProductDto productDto = productFeign.getById(detail.getProductId()).getBody();

            if (productDto != null) {
                // Asignar el precio del producto al detalle del pedido
                detail.setPrice(productDto.getPrice());

                // Calcular el monto total del detalle como precio * cantidad (amount)
                Double totalDetailPrice = detail.getPrice() * detail.getAmount();
                detail.setTotalPrice(totalDetailPrice);
            } else {
                throw new RuntimeException("Producto no encontrado para el ID: " + detail.getProductId());
            }
        });

        // Guardar el pedido con los detalles actualizados
        return orderRepository.save(order);
    }
    @Override
    public List<Order> findByClientId(Integer clientId) {
        return orderRepository.findByClientId(clientId);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }
    @Override
    public void delete(Integer id) {
        orderRepository.deleteById(id);
    }
}
