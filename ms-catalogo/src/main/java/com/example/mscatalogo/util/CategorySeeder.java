package com.example.mscatalogo.util;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategorySeeder {

    @Bean
    CommandLineRunner initCategories(CategoryRepository categoryRepository) {
        return args -> {
            // Verifica si las categorías existen por nombre o código
            if (categoryRepository.count() == 0) {
                // Crea las categorías
                Category cat1 = new Category();
                cat1.setName("Electrónica");
                cat1.setCode("ELEC");
                cat1.setDescription("Dispositivos electrónicos");

                Category cat2 = new Category();
                cat2.setName("Ropa");
                cat2.setCode("ROP");
                cat2.setDescription("Prendas de vestir");

                // Guarda las categorías
                categoryRepository.save(cat1);
                categoryRepository.save(cat2);

                System.out.println("✔ Categorías insertadas");
            } else {
                System.out.println("✔ Las categorías ya existen");
            }
        };
    }
}
