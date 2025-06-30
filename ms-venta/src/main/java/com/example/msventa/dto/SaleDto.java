package com.example.msventa.dto;

import com.example.msventa.entity.Sale;
import java.time.LocalDateTime;

public class SaleDto {

    private Integer id;
    private Integer orderId;
    private Double totalAmount;
    private String status;
    private String paymentMethod;
    private LocalDateTime saleDate;  // Cambiar a LocalDateTime
    private OrderDto orderDto;

    // Constructor que toma los datos de Sale y OrderDto
    public SaleDto(Sale sale, OrderDto orderDto) {
        this.id = sale.getId();
        this.orderId = sale.getOrderId();
        this.totalAmount = sale.getTotalAmount();
        this.status = sale.getStatus();
        this.paymentMethod = sale.getPaymentMethod();
        this.saleDate = sale.getSaleDate();  // Usar LocalDateTime directamente
        this.orderDto = orderDto;
    }

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDateTime getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }

    public OrderDto getOrderDto() {
        return orderDto;
    }

    public void setOrderDto(OrderDto orderDto) {
        this.orderDto = orderDto;
    }
}
