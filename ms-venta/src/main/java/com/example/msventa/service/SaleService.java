package com.example.msventa.service;

import com.example.msventa.dto.ReportDto;
import com.example.msventa.dto.SaleDto;
import com.example.msventa.entity.Sale;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleService {

    List<Sale> listar();  // Listar todas las ventas (Admin)

    Sale processSale(Integer orderId, String paymentMethod, Integer clientId);

    Sale getSaleById(Integer id);

    List<Sale> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    ReportDto generateReport(LocalDateTime startDate, LocalDateTime endDate);

    List<SaleDto> listarVentasPorCliente(Integer clientId);
}
