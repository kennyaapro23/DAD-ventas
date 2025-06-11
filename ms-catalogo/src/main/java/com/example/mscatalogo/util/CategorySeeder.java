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
                        {"Laptops", "LAP", "Portátiles de diferentes marcas y configuraciones"},
                        {"PCs de Escritorio", "PCD", "Computadoras de escritorio armadas y OEM"},
                        {"Monitores", "MON", "Pantallas LED, LCD, curvos y gaming"},
                        {"Teclados y Ratones", "PER", "Teclados mecánicos, inalámbricos y mouse"},
                        {"Almacenamiento", "ALM", "Discos duros HDD, SSD, M.2 y memorias USB"},
                        {"Componentes Internos", "COM", "Placas madre, procesadores, RAM, GPUs"},
                        {"Periféricos", "PERI", "Audífonos, micrófonos, cámaras y más"},
                        {"Impresoras y Escáneres", "IMP", "Impresoras láser, inyección, multifuncionales"},
                        {"Redes y Conectividad", "RED", "Routers, switches, adaptadores WiFi"},
                        {"Software y Licencias", "SOFT", "Sistemas operativos, antivirus, suites Office"}
                };

                for (String[] data : categorias) {
                    Category cat = new Category();
                    cat.setName(data[0]);
                    cat.setCode(data[1]);
                    cat.setDescription(data[2]);
                    categoryRepository.save(cat);
                }

                System.out.println("✔ Categorías de tienda de computadoras insertadas correctamente");
            } else {
                System.out.println("✔ Las categorías ya existen, no se insertan nuevamente");
            }
        };
    }
}
