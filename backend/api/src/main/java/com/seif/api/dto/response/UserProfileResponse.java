// dto/response/UserProfileResponse.java
package com.seif.api.dto.response;

import com.seif.api.model.Admin;
import com.seif.api.model.Alumni;
import com.seif.api.model.Etudiant;
import com.seif.api.model.User;
import com.seif.api.model.enums.Role;
import lombok.*;

@Getter
@Builder
public class UserProfileResponse {

    // base fields
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String phone;
    private String bio;
    private String country;
    private String city;
    private String linkedinUrl;
    private String githubUrl;
    private String avatarUrl;
    private String sector;

    // alumni-specific
    private String promotion;
    private Integer graduationYear;
    private String entreprise;
    private String jobTitle;
    private Boolean mentor;

    // etudiant-specific
    // promotion reused above

    // admin-specific
    private String department;
    private String informations;

    public static UserProfileResponse from(User user) {
        UserProfileResponse.UserProfileResponseBuilder builder = UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .bio(user.getBio())
                .country(user.getCountry())
                .city(user.getCity())
                .linkedinUrl(user.getLinkedinUrl())
                .githubUrl(user.getGithubUrl())
                .avatarUrl(user.getAvatarUrl())
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
            builder
                .department(admin.getDepartment())
                .informations(admin.getInformations());
        }

        return builder.build();
    }
}