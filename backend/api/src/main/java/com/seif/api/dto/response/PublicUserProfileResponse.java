package com.seif.api.dto.response;

import com.seif.api.model.Admin;
import com.seif.api.model.Alumni;
import com.seif.api.model.Etudiant;
import com.seif.api.model.User;
import com.seif.api.model.enums.Role;
import lombok.Builder;
import lombok.Getter;

/**
 * Public-safe profile view returned when one user views another's profile.
 *
 * Deliberately omits:
 *   - email      (private contact info)
 *   - phone      (private contact info)
 *   - informations (admin-internal notes)
 *
 * All other fields match UserProfileResponse so the frontend
 * can use a single shared interface with those fields optional/null.
 */
@Getter
@Builder
public class PublicUserProfileResponse {

    // ── Identity ────────────────────────────────────────────────────
    private Long id;
    private String firstName;
    private String lastName;
    private Role role;
    private String avatarUrl;

    // ── Public profile fields ───────────────────────────────────────
    private String bio;
    private String country;
    private String city;
    private String linkedinUrl;
    private String githubUrl;
    private String sector;

    // ── Alumni-specific ─────────────────────────────────────────────
    private String promotion;
    private Integer graduationYear;
    private String entreprise;
    private String jobTitle;
    private Boolean mentor;

    // ── Admin-specific (department is public, informations is not) ──
    private String department;

    // ── Static factory ──────────────────────────────────────────────
    public static PublicUserProfileResponse from(User user) {
        PublicUserProfileResponseBuilder builder = PublicUserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .country(user.getCountry())
                .city(user.getCity())
                .linkedinUrl(user.getLinkedinUrl())
                .githubUrl(user.getGithubUrl())
                .sector(user.getSector());

        if (user instanceof Alumni alumni) {
            builder
                    .promotion(alumni.getPromotion())
                    .graduationYear(alumni.getGraduationYear())
                    .entreprise(alumni.getEntreprise())
                    .jobTitle(alumni.getJobTitle())
                    .mentor(alumni.isMentor());
        }

        if (user instanceof Etudiant etudiant) {
            builder.promotion(etudiant.getPromotion());
        }

        if (user instanceof Admin admin) {
            // department is public — informations is intentionally excluded
            builder.department(admin.getDepartment());
        }

        return builder.build();
    }
}