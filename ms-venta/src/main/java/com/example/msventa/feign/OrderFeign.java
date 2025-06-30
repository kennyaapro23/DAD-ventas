package com.example.msventa.feign;

import com.example.msventa.dto.OrderDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ms-pedido-service", path = "/Order")
public interface OrderFeign {

    @GetMapping("/client/{clientId}")
    List<OrderDto> getOrdersByClientId(@PathVariable Integer clientId);

    @GetMapping("/{id}")
    OrderDto getById(@PathVariable Integer id);  // Devuelve directamente el OrderDto

    @PutMapping("/{id}/status")
    void updateStatus(@PathVariable Integer id, @RequestParam String status);
}
