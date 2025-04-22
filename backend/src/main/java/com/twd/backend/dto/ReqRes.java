package com.twd.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.twd.backend.entity.Product;
import com.twd.backend.entity.Role;  // Importation de l'énumération Role
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String email;
    private Role role;  // Utilisation de l'énumération Role
    private String password;
    private List<Product> products;
    private String firstName; // Ajout du prénom
    private String lastName;
}
