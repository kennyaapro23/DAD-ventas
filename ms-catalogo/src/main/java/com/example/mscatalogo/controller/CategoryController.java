package com.example.mscatalogo.controller;

import com.example.mscatalogo.entity.Category;
import com.example.mscatalogo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> list() {
        List<Category> categories = categoryService.listar();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> listById(@PathVariable Integer id) {
        return categoryService.buscarPorId(id)
                .map(category -> ResponseEntity.ok().body(category))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody Category category) {
        System.out.println("Categoria recibida: " + category);
        Category savedCategory = categoryService.guardar(category);
        return ResponseEntity.ok(savedCategory);
    }

    @PutMapping
    public ResponseEntity<Category> update(@RequestBody Category category) {
        if (category.getId() == null) {
            return ResponseEntity.badRequest().build(); // O devuelve un mensaje indicando que falta ID
        }

        return categoryService.buscarPorId(category.getId())
                .map(existingCategory -> {
                    Category updated = categoryService.actualizar(category);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return categoryService.buscarPorId(id)
                .map(category -> {
                    categoryService.eliminarPorId(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
