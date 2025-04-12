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
            users.setName(registrationRequest.getName());

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
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            var user = ourUserRepo.findByEmail(signinRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Ajoutez le rôle de l'utilisateur à la réponse
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Signed In");
            response.setRole(Role.valueOf(user.getRole().toString())); // Ajoutez cette ligne pour renvoyer le rôle

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
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
