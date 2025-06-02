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
            if (categoryRepository.count() == 0) {
                String[][] categorias = {
                        {"Electrónica", "ELEC", "Dispositivos y aparatos electrónicos"},
                        {"Ropa", "ROP", "Prendas de vestir para todas las edades"},
                        {"Hogar", "HOG", "Artículos para el hogar y decoración"},
                        {"Juguetes", "JUG", "Juguetes para niños de todas las edades"},
                        {"Deportes", "DEP", "Equipamiento deportivo y ropa deportiva"},
                        {"Libros", "LIB", "Libros de distintos géneros y autores"},
                        {"Belleza", "BEL", "Productos de cuidado personal y belleza"},
                        {"Herramientas", "HER", "Herramientas para el hogar y talleres"},
                        {"Alimentos", "ALI", "Productos alimenticios y bebidas"},
                        {"Tecnología", "TEC", "Accesorios y gadgets tecnológicos"}
                };

                for (String[] data : categorias) {
                    Category cat = new Category();
                    cat.setName(data[0]);
                    cat.setCode(data[1]);
                    cat.setDescription(data[2]);
                    categoryRepository.save(cat);
                }

                System.out.println("✔ 10 categorías insertadas correctamente");
            } else {
                System.out.println("✔ Las categorías ya existen, no se insertan nuevamente");
            }
        };
    }
}
