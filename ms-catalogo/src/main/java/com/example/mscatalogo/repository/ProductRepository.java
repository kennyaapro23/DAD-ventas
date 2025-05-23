package com.example.mscatalogo.repository;

import com.example.mscatalogo.entity.Product;
import com.example.mscatalogo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryNameIgnoreCase(String category);
    List<Product> findByCode(String code);
}
