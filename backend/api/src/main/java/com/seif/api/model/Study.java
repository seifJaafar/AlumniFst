package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Embeddable value object for a single education entry.
 * Stored in "alumni_studies" via @ElementCollection on Alumni.
 * Models the LinkedIn "Education" section.
 */
// Study.java
@Entity
@Table(name = "studies")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

    @NotBlank(message = "Institution is required")
    @Size(max = 200, message = "Institution must not exceed 200 characters")
    @Column(name = "institution", nullable = false, length = 200)
    private String institution;

    @NotBlank(message = "Degree is required")
    @Size(max = 150, message = "Degree must not exceed 150 characters")
    @Column(name = "degree", nullable = false, length = 150)
    private String degree;

    @Size(max = 150, message = "Field of study must not exceed 150 characters")
    @Column(name = "field_of_study", length = 150)
    private String fieldOfStudy;

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

    @Size(max = 100, message = "Grade must not exceed 100 characters")
    @Column(name = "grade", length = 100)
    private String grade;

    @Size(max = 500, message = "Activities must not exceed 500 characters")
    @Column(name = "activities", length = 500)
    private String activities;
}