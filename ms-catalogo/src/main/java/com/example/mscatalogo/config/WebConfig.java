package com.example.mscatalogo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Construir ruta absoluta de la carpeta 'uploads' correctamente
        String rutaAbsoluta = Paths.get("uploads").toAbsolutePath().toUri().toString();

        System.out.println("📂 Servir imágenes desde: " + rutaAbsoluta);

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(rutaAbsoluta);
    }

}
