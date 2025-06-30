package com.example.mspedido.dto;

import lombok.Data;

@Data
public class CategoryDto {
    private Integer id;
    public String name;
    private String description;
    private String code;
}
