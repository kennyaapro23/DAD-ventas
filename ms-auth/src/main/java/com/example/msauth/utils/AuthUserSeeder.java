package com.example.msauth.utils;

import com.example.msauth.entity.AuthUser;
import com.example.msauth.enums.Roles;
import com.example.msauth.repository.AuthUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthUserSeeder {

    @Bean
    CommandLineRunner initUsers(AuthUserRepository authUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (authUserRepository.count() == 0) {

                AuthUser admin = AuthUser.builder()
                        .userName("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Roles.ADMIN)
                        .build();

                AuthUser user = AuthUser.builder()
                        .userName("usuario")
                        .password(passwordEncoder.encode("user123"))
                        .role(Roles.USER)
                        .build();

                AuthUser cliente = AuthUser.builder()
                        .userName("cliente01")
                        .password(passwordEncoder.encode("cliente123"))
                        .role(Roles.CLIENTE)
                        .build();

                authUserRepository.save(admin);
                authUserRepository.save(user);
                authUserRepository.save(cliente);

                System.out.println("✔ Usuarios iniciales creados con éxito.");
            }
        };
    }
}
