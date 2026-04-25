// dto/request/UpdateAdminProfileRequest.java
package com.seif.api.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UpdateAdminProfileRequest extends UpdateProfileRequest {

    @Size(max = 150, message = "Department must not exceed 150 characters")
    private String department;

    @Size(max = 500, message = "Informations must not exceed 500 characters")
    private String informations;
}