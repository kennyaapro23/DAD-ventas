package com.example.msauth.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthUserDto {
    private String userName;
    private String password;
    private String role;

    private String name;
    private String document;
    private String telefono;
}
