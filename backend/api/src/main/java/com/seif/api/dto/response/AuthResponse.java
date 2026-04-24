// src/main/java/com/seif/api/dto/response/AuthResponse.java
package com.seif.api.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seif.api.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) 
public class AuthResponse {
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private Long userId;
}