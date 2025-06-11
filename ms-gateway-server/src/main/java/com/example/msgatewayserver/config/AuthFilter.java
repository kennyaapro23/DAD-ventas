package com.example.msgatewayserver.config;

import com.example.msgatewayserver.dto.TokenDto;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {
    private final WebClient.Builder webClient;

    public AuthFilter(WebClient.Builder webClient) {
        super(Config.class);
        this.webClient = webClient;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            System.out.println("AuthFilter: Incoming request to " + exchange.getRequest().getURI());

            // Permitir solicitudes OPTIONS sin validar token para CORS preflight
            if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
                System.out.println("AuthFilter: OPTIONS request - permitiendo sin validación");
                return chain.filter(exchange);
            }

            // Verificar si existe header Authorization
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                System.out.println("AuthFilter: No Authorization header present");
                return onError(exchange, HttpStatus.BAD_REQUEST);
            }

            String tokenHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            System.out.println("AuthFilter: Authorization header = " + tokenHeader);

            String[] chunks = tokenHeader.split(" ");
            if (chunks.length != 2 || !chunks[0].equals("Bearer")) {
                System.out.println("AuthFilter: Invalid Authorization header format");
                return onError(exchange, HttpStatus.BAD_REQUEST);
            }

            String token = chunks[1];
            System.out.println("AuthFilter: Validating token = " + token);

            // Validar token con el servicio de autenticación
            return webClient.build()
                    .post()
                    .uri("http://ms-auth-service/auth/validate?token=" + token)
                    .retrieve()
                    .bodyToMono(TokenDto.class)
                    .flatMap(t -> {
                        System.out.println("AuthFilter: Token validation successful: " + t.getToken());
                        // Continuar con la cadena de filtros si el token es válido
                        return chain.filter(exchange);
                    })
                    .onErrorResume(err -> {
                        System.out.println("AuthFilter: Token validation error: " + err.getMessage());
                        // Retornar error 401 Unauthorized si el token es inválido
                        return onError(exchange, HttpStatus.UNAUTHORIZED);
                    });
        };
    }

    // Método para retornar un error y finalizar la respuesta
    public Mono<Void> onError(ServerWebExchange exchange, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        System.out.println("AuthFilter: Returning error response with status " + status);
        return response.setComplete();
    }

    public static class Config {
    }
}
