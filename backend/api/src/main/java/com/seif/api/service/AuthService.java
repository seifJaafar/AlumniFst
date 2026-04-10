package com.seif.api.service;

import com.seif.api.dto.request.LoginRequest;
import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.dto.response.AuthResponse;
import com.seif.api.exception.ApiException; // ✅ ADD THIS
import com.seif.api.factory.UserFactoryRegistry;
import com.seif.api.model.User;
import com.seif.api.model.enums.Role;
import com.seif.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus; // ✅ ADD THIS
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserFactoryRegistry   userFactoryRegistry;  // ← add this

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already exists", HttpStatus.CONFLICT);
        }

        // Role-specific field validation
        if (request.getRole() == Role.ALUMNI) {
            if (request.getPromotion() == null)
                throw new ApiException("Promotion is required for alumni", HttpStatus.BAD_REQUEST);
            if (request.getPromotionYear() == null)
                throw new ApiException("Promotion year is required for alumni", HttpStatus.BAD_REQUEST);
        }
        if (request.getRole() == Role.ETUDIANT && request.getPromotion() == null) {
            throw new ApiException("Promotion is required for students", HttpStatus.BAD_REQUEST);
        }

        // Factory builds the correct subtype (Alumni / Etudiant / Admin)
        User user = userFactoryRegistry
                .getFactory(request.getRole())
                .createUser(request, passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // unchanged
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ApiException("User not found", HttpStatus.NOT_FOUND)
                );

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }
}