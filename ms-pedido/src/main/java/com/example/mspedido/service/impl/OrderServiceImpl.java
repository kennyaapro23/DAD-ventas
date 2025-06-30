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

        // Inyectar productos y calcular totales
        order.getOrderDetails().forEach(orderDetail -> {
            ProductDto productDto = productFeign.getById(orderDetail.getProductId()).getBody();
            if (productDto != null) {
                orderDetail.setProductDto(productDto);
                orderDetail.setPrice(productDto.getPrice());

                if (orderDetail.getAmount() == null) {
                    throw new IllegalArgumentException("La cantidad (amount) no puede ser nula");
                }

                orderDetail.setTotalPrice(orderDetail.getPrice() * orderDetail.getAmount());
            }
        });

        return Optional.of(order);
    }

    @Override
    public Order save(Order order) {
        order.getOrderDetails().forEach(detail -> {
            ProductDto productDto = productFeign.getById(detail.getProductId()).getBody();

            if (productDto != null) {
                detail.setPrice(productDto.getPrice());

                if (detail.getAmount() == null) {
                    throw new IllegalArgumentException("La cantidad (amount) del producto no puede ser nula");
                }

                detail.setTotalPrice(detail.getPrice() * detail.getAmount());
            } else {
                throw new RuntimeException("Producto no encontrado para el ID: " + detail.getProductId());
            }
        });

        return orderRepository.save(order);
    }
    @Override
    public void updateStatus(Integer orderId, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Pedido con ID " + orderId + " no encontrado.");
        }

        Order order = optionalOrder.get();
        order.setStatus(status);
        orderRepository.save(order);
    }

    @Override
    public List<Order> findByClientId(Integer clientId) {
        List<Order> orders = orderRepository.findByClientId(clientId);

        for (Order order : orders) {
            try {
                ClientDto clientDto = clientFeign.listById(order.getClientId()).getBody();
                order.setClientDto(clientDto);
            } catch (Exception e) {
                order.setClientDto(null);
            }

            for (OrderDetail detail : order.getOrderDetails()) {
                try {
                    ProductDto productDto = productFeign.getById(detail.getProductId()).getBody();
                    detail.setProductDto(productDto);

                    if (productDto != null) {
                        detail.setPrice(productDto.getPrice());

                        if (detail.getAmount() == null) {
                            throw new IllegalArgumentException("Cantidad (amount) no puede ser nula");
                        }

                        detail.setTotalPrice(detail.getPrice() * detail.getAmount());
                    }
                } catch (Exception e) {
                    detail.setProductDto(null);
                }
            }
        }

        return orders;
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