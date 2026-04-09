// src/main/java/com/alumni/platform/controller/AuthController.java
package com.seif.api.controller;

import com.seif.api.dto.request.LoginRequest;
import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.dto.response.AuthResponse;
import com.seif.api.response.ApiResponse;
import com.seif.api.response.ResponseUtil;
import com.seif.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Validated // Allow your React frontend to call this
public class AuthController {

    private final AuthService authService;

   @PostMapping("/register")
public ResponseEntity<ApiResponse<AuthResponse>> register(
        @Valid @RequestBody RegisterRequest request) {

    AuthResponse result = authService.register(request);

    return ResponseEntity.ok(
            ResponseUtil.success(result, "User registered successfully")
    );
}

@PostMapping("/login")
public ResponseEntity<ApiResponse<AuthResponse>> login(
        @Valid @RequestBody LoginRequest request) {

    AuthResponse result = authService.login(request);

    return ResponseEntity.ok(
            ResponseUtil.success(result, "Login successful")
    );
}
}