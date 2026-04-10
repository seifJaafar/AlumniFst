// src/main/java/com/alumni/platform/dto/request/RegisterRequest.java
package com.seif.api.dto.request;

import com.seif.api.model.enums.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

    private String promotion;        // cohort/class label e.g. "L3-INFO" — for Etudiant

    @Min(value = 1900, message = "Invalid graduation year")
    @Max(value = 2100, message = "Invalid graduation year")
    private Integer promotionYear;   // graduation year e.g. 2022 — for Alumni
}