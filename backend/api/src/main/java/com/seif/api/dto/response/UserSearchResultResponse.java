package com.seif.api.dto.response;

import com.seif.api.model.Admin;
import com.seif.api.model.Alumni;
import com.seif.api.model.Etudiant;
import com.seif.api.model.User;
import com.seif.api.model.enums.Role;
import lombok.Builder;
import lombok.Getter;

/**
 * Lightweight projection used in search results.
 * Only includes fields needed to render a result card and link to the profile.
 * Never includes email, phone, or other private fields.
 */
@Getter
@Builder
public class UserSearchResultResponse {

    private Long   id;
    private String firstName;
    private String lastName;
    private Role   role;
    private String avatarUrl;

    // Shown as the subtitle in the search card
    private String headline;   // jobTitle for alumni, promotion for students, department for admins

    private String city;
    private String country;
    private Boolean mentor;    // alumni only — shown as a badge

    public static UserSearchResultResponse from(User user) {
        String headline = null;

        if (user instanceof Alumni alumni) {
            // "Software Engineer · Acme Corp"  or just title
            headline = alumni.getJobTitle() != null && alumni.getEntreprise() != null
                    ? alumni.getJobTitle() + " · " + alumni.getEntreprise()
                    : alumni.getJobTitle() != null
                    ? alumni.getJobTitle()
                    : alumni.getEntreprise();
        } else if (user instanceof Etudiant etudiant) {
            headline = etudiant.getPromotion() != null
                    ? "Promotion " + etudiant.getPromotion()
                    : null;
        } else if (user instanceof Admin admin) {
            headline = admin.getDepartment();
        }

        return UserSearchResultResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .avatarUrl(user.getAvatarUrl())
                .headline(headline)
                .city(user.getCity())
                .country(user.getCountry())
                .mentor(user instanceof Alumni a ? a.isMentor() : null)
                .build();
    }
}