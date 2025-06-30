package com.example.msventa.dto;

import jakarta.persistence.Transient;
import lombok.Data;

@Data
public class OrderDetailDto {
    private Integer productId;
    private ProductDto productDto;
    private Double price;
    private Integer amount;
    private Double totalPrice;

    public void calculateTotalPrice() {
        if (this.amount != null && this.price != null) {
            this.totalPrice = this.amount * this.price;
        }
    }
}
