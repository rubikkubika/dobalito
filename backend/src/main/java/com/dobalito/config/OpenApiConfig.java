package com.dobalito.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Dobalito API")
                .version("1.0.0")
                .description("API для платформы Dobalito - сервис поиска исполнителей и заказчиков")
                .contact(new Contact()
                    .name("Dobalito Team")
                    .email("support@dobalito.com")
                    .url("https://dobalito.com"))
                .license(new License()
                    .name("MIT License")
                    .url("https://opensource.org/licenses/MIT")))
            .servers(List.of(
                new Server()
                    .url("http://localhost:8080")
                    .description("Development server"),
                new Server()
                    .url("https://api.dobalito.com")
                    .description("Production server")
            ));
    }
}

