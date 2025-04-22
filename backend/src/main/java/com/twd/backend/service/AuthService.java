package com.twd.backend.service;

import com.twd.backend.dto.ReqRes;
import com.twd.backend.entity.Role;
import com.twd.backend.entity.Users;
import com.twd.backend.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class AuthService {

    @Autowired
    private OurUserRepo ourUserRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            // Vérifier si le rôle existe dans l'énumération Role
            Role role = null;
            try {
                role = Role.valueOf(registrationRequest.getRole().toString());  // Convertir en majuscule et attribuer le rôle
            } catch (IllegalArgumentException e) {
                resp.setStatusCode(400);  // Mauvaise requête
                resp.setError("Rôle invalide fourni");
                return resp;
            }

            Users users = new Users();
            users.setEmail(registrationRequest.getEmail());
            users.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            users.setRole(role);  // Attribuer le rôle validé

            // Ajouter le prénom et le nom
            users.setFirstName(registrationRequest.getFirstName());
            users.setLastName(registrationRequest.getLastName());

            Users ourUserResult = ourUserRepo.save(users);
            if (ourUserResult != null && ourUserResult.getId() > 0) {
                resp.setRefreshToken(String.valueOf(ourUserResult));
                resp.setMessage("Utilisateur enregistré avec succès");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes signIn(ReqRes signinRequest) {
        ReqRes response = new ReqRes();

        try {
            // Authentification de l'utilisateur via Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signinRequest.getEmail(),
                            signinRequest.getPassword()
                    )
            );

            // Récupération de l'utilisateur depuis la base
            Users user = ourUserRepo.findByEmail(signinRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            // Génération des tokens
            String jwt = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Construction de la réponse
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Connexion réussie");
            response.setRole(user.getRole());

        } catch (Exception e) {
            response.setStatusCode(401);
            response.setError("Échec de l'authentification : " + e.getMessage());
        }

        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest) {
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
        Users users = ourUserRepo.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenReqiest.getToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Refreshed Token");
        }
        response.setStatusCode(500);
        return response;
    }
}
