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

    @GetMapping()
    public ResponseEntity<List<Category>> list(){

        return ResponseEntity.ok().body(categoryService.listar());
    }
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> listById(@PathVariable(required = true)Integer id){
        return ResponseEntity.ok().body(categoryService.buscarPorId(id).get());
    }

    @PostMapping()
    public ResponseEntity<Category> save(@RequestBody Category category){
        System.out.println("Categoria recibida: " + category);
        return ResponseEntity.ok().body(categoryService.guardar(category));

    }

    @PutMapping()
    public ResponseEntity<Category> update(@RequestBody Category category){
        return ResponseEntity.ok().body(categoryService.actualizar(category));
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(required = true)Integer id){
        categoryService.eliminarPorId(id);
        return "elminacion correcta";
    }
}