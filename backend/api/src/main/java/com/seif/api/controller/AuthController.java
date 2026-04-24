// src/main/java/com/alumni/platform/controller/AuthController.java
package com.seif.api.controller;

import com.seif.api.dto.request.LoginRequest;
import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.dto.response.AuthResponse;
import com.seif.api.response.ApiResponse;
import com.seif.api.response.ResponseUtil;
import com.seif.api.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated // Allow your React frontend to call this
public class AuthController {

    private final AuthService authService;
    private static final int COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

   @PostMapping("/register")
public ResponseEntity<ApiResponse<AuthResponse>> register(
        @Valid @RequestBody RegisterRequest request,HttpServletResponse response) {

    AuthResponse result = authService.register(request);
    setJwtCookie(response, result.getToken());
        result.setToken(null);
    return ResponseEntity.ok(
            ResponseUtil.success(result, "User registered successfully")
    );
}

@PostMapping("/login")
public ResponseEntity<ApiResponse<AuthResponse>> login(
        @Valid @RequestBody LoginRequest request,HttpServletResponse response) {

    AuthResponse result = authService.login(request);
    setJwtCookie(response, result.getToken());
        result.setToken(null);
    return ResponseEntity.ok(
            ResponseUtil.success(result, "Login successful")
    );
}
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        clearJwtCookie(response);
        return ResponseEntity.ok(ResponseUtil.success(null, "Logged out successfully"));
    }
    private void setJwtCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);   // ← set true in production (HTTPS only)
        cookie.setPath("/");
        cookie.setMaxAge(COOKIE_MAX_AGE);
        response.addCookie(cookie);
    }

    private void clearJwtCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // immediately expire
        response.addCookie(cookie);
    }
}