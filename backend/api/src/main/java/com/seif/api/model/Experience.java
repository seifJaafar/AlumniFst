package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Embeddable value object for a single work experience entry.
 * Stored in "alumni_experiences" via @ElementCollection on Alumni.
 * Models the LinkedIn "Experience" section.
 */
// Experience.java
@Entity
@Table(name = "experiences")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

    @NotBlank(message = "Job title is required")
    @Size(max = 150, message = "Title must not exceed 150 characters")
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Company is required")
    @Size(max = 200, message = "Company must not exceed 200 characters")
    @Column(name = "company", nullable = false, length = 200)
    private String company;

    @Size(max = 50, message = "Employment type must not exceed 50 characters")
    @Pattern(
        regexp = "^(Full-time|Part-time|Freelance|Internship|Contract|Volunteer|Other)?$",
        message = "Invalid employment type"
    )
    @Column(name = "employment_type", length = 50)
    private String employmentType;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Column(name = "location", length = 200)
    private String location;

    @Size(max = 20, message = "Location type must not exceed 20 characters")
    @Pattern(
        regexp = "^(On-site|Remote|Hybrid)?$",
        message = "Location type must be On-site, Remote, or Hybrid"
    )
    @Column(name = "location_type", length = 20)
    private String locationType;

    @Pattern(
        regexp = "^\\d{4}-(0[1-9]|1[0-2])$",
        message = "Start date must be in YYYY-MM format"
    )
    @Column(name = "start_date", length = 7)
    private String startDate;

    @Pattern(
        regexp = "^\\d{4}-(0[1-9]|1[0-2])$",
        message = "End date must be in YYYY-MM format"
    )
    @Column(name = "end_date", length = 7)
    private String endDate;

    @Column(name = "is_current", nullable = false)
    private boolean current = false;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Size(max = 100, message = "Sector must not exceed 100 characters")
    @Column(name = "sector", length = 100)
    private String sector;
}