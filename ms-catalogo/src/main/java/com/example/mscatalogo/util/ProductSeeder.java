package com.example.mscatalogo.util;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.repository.CategoryRepository;
import com.example.mscatalogo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Random;


@Configuration
public class ProductSeeder {

    @Bean
    CommandLineRunner initProducts(ProductRepository productRepository,
                                   CategoryRepository categoryRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                List<Category> categorias = categoryRepository.findAll();

                if (categorias.isEmpty()) {
                    System.out.println("⚠️ No hay categorías disponibles en la base de datos.");
                    return;
                }

                Random random = new Random();

                for (int i = 1; i <= 200; i++) {
                    Product p = new Product();

                    // Selecciona una categoría aleatoria
                    Category categoria = categorias.get(random.nextInt(categorias.size()));
                    p.setCategory(categoria);

                    // Genera datos simulados
                    p.setName("Producto " + i + " - " + categoria.getName());
                    p.setDescription("Descripción del producto " + i + " de la categoría " + categoria.getName());
                    p.setCode(categoria.getCode() + String.format("%03d", i));
                    p.setStock(10 + random.nextInt(90)); // Stock entre 10 y 99
                    p.setPrice(50 + (1000 * random.nextDouble())); // Precio entre 50 y 1050

                    productRepository.save(p);
                }

                System.out.println("✔ 200 productos generados e insertados");
            } else {
                System.out.println("✔ Productos ya existen, no se insertan nuevamente");
            }
        };
    }
}
