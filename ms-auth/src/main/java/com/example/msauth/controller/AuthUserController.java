package com.example.msauth.controller;

import com.example.msauth.dto.AuthUserDto;
import com.example.msauth.entity.AuthUser;
import com.example.msauth.entity.TokenDto;
import com.example.msauth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthUserController {

    @Autowired
    private AuthUserService authUserService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(authUserService.findAll());
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthUserDto authUserDto) {
        System.out.println("🟢 Llegó login: " + authUserDto.getUserName());
        TokenDto tokenDto = authUserService.login(authUserDto);
        if (tokenDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Credenciales incorrectas"));
        }
        return ResponseEntity.ok(tokenDto);
    }

    // ✅ VALIDAR TOKEN
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token) {
        TokenDto tokenDto = authUserService.validate(token);
        if (tokenDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Token inválido o expirado"));
        }
        return ResponseEntity.ok(tokenDto);
    }

    // 👤 REGISTRAR USUARIO
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody AuthUserDto authUserDto) {
        System.out.println("🟢 Intentando crear usuario: " + authUserDto.getUserName());
        AuthUser authUser = authUserService.save(authUserDto);
        if (authUser == null) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "El usuario ya existe"));
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authUser);
    }
}
