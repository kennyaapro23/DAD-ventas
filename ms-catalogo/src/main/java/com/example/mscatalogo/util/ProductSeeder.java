package com.example.mscatalogo.util;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.repository.CategoryRepository;
import com.example.mscatalogo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
public class ProductSeeder {

    @Bean
    CommandLineRunner initProducts(ProductRepository productRepository,
                                   CategoryRepository categoryRepository) {
        return args -> {
            // Verifica si ya existen productos
            if (productRepository.count() == 0) {
                // Verifica que las categorías necesarias existan
                Optional<Category> optElect = categoryRepository.findById(1);
                Optional<Category> optRopa = categoryRepository.findById(2);

                // Si ambas categorías existen
                if (optElect.isPresent() && optRopa.isPresent()) {
                    Category elect = optElect.get();
                    Category ropa = optRopa.get();

                    // Crea los productos
                    Product p1 = new Product();
                    p1.setName("Laptop Lenovo");
                    p1.setDescription("Laptop gama media");
                    p1.setCode("LAP123");
                    p1.setStock(25);
                    p1.setPrice(3500.00);
                    p1.setCategory(elect);

                    Product p2 = new Product();
                    p2.setName("Polera Negra");
                    p2.setDescription("Polera talla M");
                    p2.setCode("ROP456");
                    p2.setStock(50);
                    p2.setPrice(120.00);
                    p2.setCategory(ropa);

                    // Guarda los productos
                    productRepository.save(p1);
                    productRepository.save(p2);

                    System.out.println("✔ Productos insertados");
                } else {
                    // Imprime un error si las categorías no existen
                    System.out.println("⚠️ No se pueden insertar productos, las categorías necesarias no existen");
                }
            } else {
                System.out.println("✔ Productos ya existen, no se insertan nuevamente");
            }
        };
    }
}
