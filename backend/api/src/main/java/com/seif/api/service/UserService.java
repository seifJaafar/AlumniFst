package com.seif.api.service;

import com.seif.api.dto.request.*;
import com.seif.api.dto.response.PublicUserProfileResponse;
import com.seif.api.dto.response.UserProfileResponse;
import com.seif.api.exception.ApiException;
import com.seif.api.model.*;
import com.seif.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // ── Own profile (/api/users/profile) ───────────────────────────
    public UserProfileResponse getProfile(String email) {
        User user = findByEmail(email);
        return UserProfileResponse.from(user);
    }

    // ── Public profile (/api/users/{id}) ───────────────────────────
    /**
     * Returns a public-safe view of any user's profile.
     * Accessible by any authenticated user.
     * Private fields (email, phone, admin notes) are excluded — see
     * PublicUserProfileResponse for the exact omission list.
     */
    public PublicUserProfileResponse getPublicProfile(Long id) {
        User user = findById(id);
        return PublicUserProfileResponse.from(user);
    }

    // ── Base fields update (all roles) ─────────────────────────────
    @Transactional
    public UserProfileResponse updateBaseProfile(String email, UpdateProfileRequest req) {
        User user = findByEmail(email);
        applyBaseFields(user, req);
        return UserProfileResponse.from(userRepository.save(user));
    }

    // ── Alumni-specific fields ──────────────────────────────────────
    @Transactional
    public UserProfileResponse updateAlumniProfile(String email, UpdateAlumniProfileRequest req) {
        User user = findByEmail(email);

        if (!(user instanceof Alumni alumni)) {
            throw new ApiException("User is not an alumni", HttpStatus.FORBIDDEN);
        }

        applyBaseFields(alumni, req);

        if (req.getEntreprise() != null) alumni.setEntreprise(req.getEntreprise());
        if (req.getJobTitle()   != null) alumni.setJobTitle(req.getJobTitle());
        if (req.getMentor()     != null) alumni.setMentor(req.getMentor());

        return UserProfileResponse.from(userRepository.save(alumni));
    }

    // ── Admin-specific fields ───────────────────────────────────────
    @Transactional
    public UserProfileResponse updateAdminProfile(String email, UpdateAdminProfileRequest req) {
        User user = findByEmail(email);

        if (!(user instanceof Admin admin)) {
            throw new ApiException("User is not an admin", HttpStatus.FORBIDDEN);
        }

        applyBaseFields(admin, req);

        if (req.getDepartment()   != null) admin.setDepartment(req.getDepartment());
        if (req.getInformations() != null) admin.setInformations(req.getInformations());

        return UserProfileResponse.from(userRepository.save(admin));
    }

    // ── Helpers ─────────────────────────────────────────────────────
    private User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    private User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    private void applyBaseFields(User user, UpdateProfileRequest req) {
        if (req.getPhone()       != null) user.setPhone(req.getPhone());
        if (req.getBio()         != null) user.setBio(req.getBio());
        if (req.getCountry()     != null) user.setCountry(req.getCountry());
        if (req.getCity()        != null) user.setCity(req.getCity());
        if (req.getLinkedinUrl() != null) user.setLinkedinUrl(req.getLinkedinUrl());
        if (req.getGithubUrl()   != null) user.setGithubUrl(req.getGithubUrl());
        if (req.getAvatarUrl()   != null) user.setAvatarUrl(req.getAvatarUrl());
        if (req.getSector()      != null) user.setSector(req.getSector());
    }
}