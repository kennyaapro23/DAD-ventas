package com.example.mscatalogo.util;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.repository.CategoryRepository;
import com.example.mscatalogo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.*;

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

                // Mapa de productos reales por categoría
                Map<String, List<String>> productosPorCategoria = new HashMap<>();

                productosPorCategoria.put("Laptops", Arrays.asList(
                        "Lenovo IdeaPad 3", "HP Pavilion x360", "Acer Aspire 5", "Dell Inspiron 15", "ASUS VivoBook"
                ));

                productosPorCategoria.put("PCs de Escritorio", Arrays.asList(
                        "HP ProDesk 400", "Dell OptiPlex 3090", "Lenovo ThinkCentre M70", "Acer Veriton X", "MSI Cubi 5"
                ));

                productosPorCategoria.put("Monitores", Arrays.asList(
                        "LG UltraGear 27\"", "Samsung Curvo 24\"", "AOC 27B2H", "Dell SE2422H", "BenQ GW2480"
                ));

                productosPorCategoria.put("Teclados y Ratones", Arrays.asList(
                        "Logitech MK270", "Redragon K552 Kumara", "Razer DeathAdder", "Corsair K55 RGB", "Microsoft Wireless 900"
                ));

                productosPorCategoria.put("Almacenamiento", Arrays.asList(
                        "Kingston SSD A400 240GB", "WD Blue 1TB", "Seagate Barracuda 2TB", "Samsung EVO 970 500GB", "SanDisk USB 64GB"
                ));

                productosPorCategoria.put("Componentes Internos", Arrays.asList(
                        "Intel Core i5-12400F", "AMD Ryzen 5 5600X", "Gigabyte B550M DS3H", "Corsair Vengeance 16GB", "ASUS GTX 1660 Super"
                ));

                productosPorCategoria.put("Periféricos", Arrays.asList(
                        "Logitech C920 Webcam", "HyperX Cloud Stinger", "Blue Yeti Mic", "TP-Link USB WiFi", "Trust GXT 488 Auriculares"
                ));

                productosPorCategoria.put("Impresoras y Escáneres", Arrays.asList(
                        "HP DeskJet 2710", "Epson EcoTank L3210", "Canon PIXMA G3160", "Brother HL-1212W", "HP LaserJet MFP M28w"
                ));

                productosPorCategoria.put("Redes y Conectividad", Arrays.asList(
                        "TP-Link Archer C6", "MikroTik hAP ac²", "TP-Link TL-SF1005D", "Ubiquiti UniFi AC Lite", "Netgear Nighthawk"
                ));

                productosPorCategoria.put("Software y Licencias", Arrays.asList(
                        "Windows 11 Pro", "Microsoft Office 2021", "ESET NOD32 Antivirus", "Adobe Photoshop CC", "AutoCAD 2023"
                ));

                Random random = new Random();

                for (Category categoria : categorias) {
                    List<String> productos = productosPorCategoria.getOrDefault(categoria.getName(), Collections.emptyList());

                    for (int i = 0; i < productos.size(); i++) {
                        Product p = new Product();

                        String nombre = productos.get(i);

                        p.setCategory(categoria);
                        p.setName(nombre);
                        p.setDescription("Producto de la categoría " + categoria.getName() + ": " + nombre);
                        p.setCode(categoria.getCode() + String.format("%03d", i + 1));
                        p.setStock(10 + random.nextInt(50));
                        p.setPrice(100 + (random.nextDouble() * 1500));

                        productRepository.save(p);
                    }
                }

                System.out.println("✔ Productos reales insertados por categoría");
            } else {
                System.out.println("✔ Productos ya existen, no se insertan nuevamente");
            }
        };
    }
}
