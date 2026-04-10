package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Etudiant — a currently enrolled student at Fac des Sciences.
 * Extends User (JOINED table: "etudiants").
 *
 * Relationships:
 *  - One Etudiant → Many Mentorships (as mentee)
 *  - Many Etudiants ↔ Many Events (as participant)
 *  - Managed by one Admin
 */
@Entity
@Table(
    name = "etudiants",
    indexes = {
        @Index(name = "idx_etudiant_promotion", columnList = "promotion")
    }
)
@DiscriminatorValue("ETUDIANT")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
@NoArgsConstructor
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Etudiant extends User {

    /** Current promotion / cohort year e.g. "L3-INFO". */
    @NotBlank(message = "Promotion is required")
    @Column(name = "promotion", nullable = false, length = 10)
    private String promotion;

    // ----------------------------------------------------------------
    // Experiences (same structure as Alumni)
    // ----------------------------------------------------------------
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "etudiant_experiences",
        joinColumns = @JoinColumn(name = "etudiant_id")
    )
    @OrderColumn(name = "experience_order")
    private List<Experience> experiences = new ArrayList<>();

    // ----------------------------------------------------------------
    // Skills (same structure as Alumni)
    // ----------------------------------------------------------------
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "etudiant_skills",
        joinColumns        = @JoinColumn(name = "etudiant_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills = new HashSet<>();

    // ----------------------------------------------------------------
    // Mentorship sessions where this student acts as MENTEE
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "etudiant",
        cascade  = CascadeType.ALL,
        orphanRemoval = true,
        fetch    = FetchType.LAZY
    )
    private List<Mentorship> mentorships = new ArrayList<>();

    // ----------------------------------------------------------------
    // Events this student has registered to
    // ----------------------------------------------------------------
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "event_participants",
        joinColumns        = @JoinColumn(name = "etudiant_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<Event> registeredEvents = new HashSet<>();
}