package com.twd.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") //Enable CORS for all endpoints
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Methods you want to allow
                .allowedHeaders("*"); // You can restrict to specific headers if needed
            }
        };
    }
}
