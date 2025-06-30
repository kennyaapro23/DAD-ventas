package com.example.mspedido.feign;

import com.example.mspedido.dto.ClientDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-client-service", path = "/Client")
public interface ClientFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "clientListByIdCB", fallbackMethod = "clientListByIdFallback")
    ResponseEntity<ClientDto> listById(@PathVariable Integer id);

    // Fallback method to handle failures when the service is unavailable
    default ResponseEntity<ClientDto> clientListByIdFallback(Integer id, Throwable e) {
        ClientDto fallbackClient = new ClientDto();
        fallbackClient.setId(0);  // Default ID 0 to signify it's a fallback client
        fallbackClient.setName("Desconocido");
        fallbackClient.setEmail("unknown@example.com");
        fallbackClient.setDocument("N/A");
        return ResponseEntity.ok(fallbackClient);  // Return the fallback client in the response
    }
}
