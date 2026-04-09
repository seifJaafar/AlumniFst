package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Embeddable value object for a single work experience entry.
 * Stored in "alumni_experiences" via @ElementCollection on Alumni.
 * Models the LinkedIn "Experience" section.
 */
@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class Experience {

    @NotBlank(message = "Job title is required")
    @Size(max = 150)
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Company is required")
    @Size(max = 200)
    @Column(name = "company", nullable = false, length = 200)
    private String company;

    /** e.g. "Full-time", "Part-time", "Freelance", "Internship" */
    @Size(max = 50)
    @Column(name = "employment_type", length = 50)
    private String employmentType;

    @Size(max = 200)
    @Column(name = "location", length = 200)
    private String location;

    /** e.g. "On-site", "Remote", "Hybrid" */
    @Size(max = 20)
    @Column(name = "location_type", length = 20)
    private String locationType;

    /** Format: "YYYY-MM", e.g. "2021-03" */
    @Column(name = "start_date", length = 7)
    private String startDate;

    /** Null means currently working here */
    @Column(name = "end_date", length = 7)
    private String endDate;

    @Column(name = "is_current")
    private boolean current;

    @Size(max = 2000)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Size(max = 100)
    @Column(name = "sector", length = 100)
    private String sector;
}