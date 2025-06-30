package com.example.mscatalogo.controller;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/Product")
public class ProductController {

    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private ProductService productService;

    @GetMapping()
    public ResponseEntity<List<Product>> list() {
        System.out.println("GET /Product called");
        List<Product> products = productService.listar();
        System.out.println("Products found: " + products.size());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Integer id){
        return ResponseEntity.ok(productService.buscarPorId(id).get());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> save(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam Integer categoryId,
            @RequestParam(required = false) MultipartFile image
    ) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);

        Category category = new Category();
        category.setId(categoryId);
        product.setCategory(category);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image); // Tu método de guardado
            product.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(productService.guardar(product));
    }


    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> update(
            @RequestParam Integer id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam Integer categoryId,
            @RequestParam(required = false) MultipartFile image
    ) {
        Product product = productService.buscarPorId(id).orElseThrow();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);

        Category cat = new Category();
        cat.setId(categoryId);
        product.setCategory(cat);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(productService.actualizar(product));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        productService.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/reduce-stock")
    public ResponseEntity<Void> reduceStock(@PathVariable Integer id, @RequestParam Integer amount) {
        productService.reduceStock(id, amount);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String code) {

        List<Product> results = productService.advancedSearch(name, category, code);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam MultipartFile image) {
        String imageUrl = saveImage(image);
        return ResponseEntity.ok(imageUrl);
    }

    private String saveImage(MultipartFile image) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String cleanedFileName = image.getOriginalFilename()
                    .replaceAll("\\s+", "_")
                    .replaceAll("[^a-zA-Z0-9._-]", "");

            String uniqueName = UUID.randomUUID() + "_" + cleanedFileName;

            Path destination = Paths.get(UPLOAD_DIR).resolve(uniqueName);
            Files.copy(image.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            return "http://localhost:8085/uploads/" + uniqueName;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen", e);
        }
    }

}
