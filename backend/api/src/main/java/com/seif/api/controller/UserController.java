package com.seif.api.controller;

import com.seif.api.dto.request.*;
import com.seif.api.dto.response.PublicUserProfileResponse;
import com.seif.api.dto.response.UserProfileResponse;
import com.seif.api.exception.ApiException;
import com.seif.api.response.ApiResponse;
import com.seif.api.response.ResponseUtil;
import com.seif.api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ── GET /api/users/profile  (own profile — full data) ──────────
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<?>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        UserProfileResponse profile = userService.getProfile(userDetails.getUsername());
        return ResponseEntity.ok(ResponseUtil.success(profile, "Profile fetched"));
    }

    // ── GET /api/users/{id}  (any user — public data only) ─────────
    /**
     * Returns the public-safe profile of any user by their ID.
     * Requires authentication (any role).
     * Email, phone and admin notes are excluded from the response.
     *
     * Note: /profile is matched before /{id} by Spring because
     * literal path segments take precedence over path variables,
     * so GET /api/users/profile will never be swallowed by this route.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getPublicProfile(
            @PathVariable Long id) {

        PublicUserProfileResponse profile = userService.getPublicProfile(id);
        return ResponseEntity.ok(ResponseUtil.success(profile, "Profile fetched"));
    }

    // ── PUT /api/users/profile  (base fields — all roles) ──────────
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<?>> updateBaseProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        UserProfileResponse updated = userService.updateBaseProfile(
                userDetails.getUsername(), request);
        return ResponseEntity.ok(ResponseUtil.success(updated, "Profile updated"));
    }

    // ── PUT /api/users/profile/alumni ───────────────────────────────
    @PutMapping("/profile/alumni")
    public ResponseEntity<ApiResponse<?>> updateAlumniProfile(
            @Valid @RequestBody UpdateAlumniProfileRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        UserProfileResponse updated = userService.updateAlumniProfile(
                userDetails.getUsername(), request);
        return ResponseEntity.ok(ResponseUtil.success(updated, "Alumni profile updated"));
    }

    // ── PUT /api/users/profile/admin ────────────────────────────────
    @PutMapping("/profile/admin")
    public ResponseEntity<ApiResponse<?>> updateAdminProfile(
            @Valid @RequestBody UpdateAdminProfileRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        UserProfileResponse updated = userService.updateAdminProfile(
                userDetails.getUsername(), request);
        return ResponseEntity.ok(ResponseUtil.success(updated, "Admin profile updated"));
    }
}