package com.example.msauth.feign;

import com.example.msauth.dto.ClientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-client-service", path = "/Client")
public interface ClientFeign {

    @PostMapping
    ClientDto createClient(@RequestBody ClientDto clientDto);

}