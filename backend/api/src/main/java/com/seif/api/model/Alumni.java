package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Alumni — a graduated member of the Fac des Sciences network.
 * Extends User (JOINED table: "alumni").
 *
 * Relationships:
 *  - One Alumni → Many Events (as creator)
 *  - Many Alumni ↔ Many Events (as participant via event_participants)
 *  - One Alumni → Many Mentorships (as mentor)
 *  - Many Alumni ↔ Many Skills
 *  - One Alumni → Many Experiences (embedded collection)
 */
@Entity
@Table(
    name = "alumni",
    indexes = {
        @Index(name = "idx_alumni_promotion", columnList = "promotion"),
        @Index(name = "idx_alumni_entreprise", columnList = "entreprise")
    }
)
@DiscriminatorValue("ALUMNI")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
@NoArgsConstructor
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Alumni extends User {

    /** Cohort/class label e.g. "L3-INFO". */
    @NotBlank(message = "Promotion is required")
    @Column(name = "promotion", nullable = false, length = 10)
    private String promotion;

    /** Year of graduation e.g. 2022. */
    @NotNull(message = "Graduation year is required")
    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    /** Current employer. */
    @Size(max = 200)
    @Column(name = "entreprise", length = 200)
    private String entreprise;

    /** Current job title. */
    @Size(max = 150)
    @Column(name = "job_title", length = 150)
    private String jobTitle;

    /** Short professional bio displayed on the profile page. */
    @Size(max = 2000)
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    /** LinkedIn profile URL. */
    @Size(max = 500)
    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    /** Whether this alumni is open to mentor students. */
    @Column(name = "is_mentor", nullable = false)
    private boolean mentor = false;

    // ----------------------------------------------------------------
    // Embedded list of work experiences
    // ----------------------------------------------------------------
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "alumni_experiences",
        joinColumns = @JoinColumn(name = "alumni_id")
    )
    @OrderColumn(name = "experience_order")
    private List<Experience> experiences = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "alumni_studies",
        joinColumns = @JoinColumn(name = "alumni_id")
    )
    @OrderColumn(name = "study_order")
    private List<Study> studies = new ArrayList<>();

    // ----------------------------------------------------------------
    // Skills (M:N with a join table)
    // ----------------------------------------------------------------
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "alumni_skills",
        joinColumns        = @JoinColumn(name = "alumni_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills = new HashSet<>();

    // ----------------------------------------------------------------
    // Mentorship sessions where this alumni acts as MENTOR
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "mentor",
        cascade  = CascadeType.ALL,
        orphanRemoval = true,
        fetch    = FetchType.LAZY
    )
    private List<Mentorship> mentorships = new ArrayList<>();

    // ----------------------------------------------------------------
    // Events this alumni has created
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "createdBy",
        cascade  = {CascadeType.PERSIST, CascadeType.MERGE},
        fetch    = FetchType.LAZY
    )
    private List<Event> createdEvents = new ArrayList<>();
}