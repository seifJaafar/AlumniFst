// dto/request/UpdateAlumniProfileRequest.java
package com.seif.api.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UpdateAlumniProfileRequest extends UpdateProfileRequest {

    @Size(max = 200, message = "Entreprise must not exceed 200 characters")
    private String entreprise;

    @Size(max = 150, message = "Job title must not exceed 150 characters")
    private String jobTitle;

    private Boolean mentor;
}