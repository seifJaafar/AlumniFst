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
        @Index(name = "idx_alumni_pays",      columnList = "pays"),
        @Index(name = "idx_alumni_secteur",   columnList = "secteur")
    }
)
@DiscriminatorValue("ALUMNI")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
@NoArgsConstructor
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Alumni extends User {

    /** Year of graduation, e.g. "2019". */
    @NotBlank(message = "Promotion year is required")
    @Column(name = "promotion", nullable = false, length = 10)
    private String promotion;

    /** Current employer. */
    @Size(max = 200)
    @Column(name = "entreprise", length = 200)
    private String entreprise;

    /** Current job title. */
    @Size(max = 150)
    @Column(name = "poste", length = 150)
    private String poste;

    /** Country of residence — used for the interactive map feature. */
    @Size(max = 100)
    @Column(name = "pays", length = 100)
    private String pays;

    /** Geographic coordinates for map pin (latitude). */
    @Column(name = "latitude")
    private Double latitude;

    /** Geographic coordinates for map pin (longitude). */
    @Column(name = "longitude")
    private Double longitude;

    /** Short professional bio displayed on the profile page. */
    @Size(max = 2000)
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    /** LinkedIn profile URL. */
    @Size(max = 500)
    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    /** Industry sector, e.g. "Technology", "Finance". Used for advanced filters. */
    @Size(max = 100)
    @Column(name = "secteur", length = 100)
    private String secteur;

    /** Whether this alumni is open to mentor students. */
    @Column(name = "is_mentor", nullable = false)
    private boolean mentor = false;

    // ----------------------------------------------------------------
    // Embedded list of work experiences (stored as @ElementCollection
    // in a separate "alumni_experiences" table — avoids extra entity
    // class while keeping full JPA mapping).
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

    // ----------------------------------------------------------------
    // Events this alumni participates in
    // ----------------------------------------------------------------
   

}