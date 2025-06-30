package com.example.msventa.repository;

import com.example.msventa.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

    // Consulta para encontrar ventas dentro de un rango de fechas
    @Query("SELECT s FROM Sale s WHERE s.saleDate BETWEEN :startDate AND :endDate")
    List<Sale> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<Sale> findByClientId(Integer clientId);


}
