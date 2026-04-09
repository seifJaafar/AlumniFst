package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Mentorship — a relationship between an Alumni (mentor) and an Etudiant (mentee).
 *
 * The presentation highlights:
 *  - Request/acceptance workflow
 *  - Session history for continuous tracking
 *  - Feedback mechanism
 *
 * Relationships:
 *  - ManyToOne → Alumni   (mentor)
 *  - ManyToOne → Etudiant (etudiant / mentee)
 *  - OneToMany → MentorshipSession (session history)
 */
@Entity
@Table(
    name = "mentorships",
    uniqueConstraints = @UniqueConstraint(
        name = "uq_mentorship_pair",
        columnNames = {"mentor_id", "etudiant_id"}
    ),
    indexes = {
        @Index(name = "idx_mentorship_mentor",   columnList = "mentor_id"),
        @Index(name = "idx_mentorship_etudiant", columnList = "etudiant_id"),
        @Index(name = "idx_mentorship_status",   columnList = "status")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Mentorship {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mentorship_seq")
    @SequenceGenerator(name = "mentorship_seq", sequenceName = "mentorship_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    // ----------------------------------------------------------------
    // Participants
    // ----------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "mentor_id", nullable = false)
    private Alumni mentor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiant;

    // ----------------------------------------------------------------
    // Lifecycle
    // ----------------------------------------------------------------
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private MentorshipStatus status = MentorshipStatus.PENDING;

    /** Optional message from the student when requesting mentorship. */
    @Size(max = 1000)
    @Column(name = "request_message", columnDefinition = "TEXT")
    private String requestMessage;

    /**
     * End-of-mentorship feedback from the student.
     * Collected after the mentorship is marked COMPLETED.
     */
    @Size(max = 2000)
    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    /** 1–5 star rating given by the student. */
    @Min(1) @Max(5)
    @Column(name = "rating")
    private Integer rating;

    // ----------------------------------------------------------------
    // Session history — key feature for "suivi continu"
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "mentorship",
        cascade  = CascadeType.ALL,
        orphanRemoval = true,
        fetch    = FetchType.LAZY
    )
    @Builder.Default
    private List<MentorshipSession> sessions = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ----------------------------------------------------------------
    // Enum
    // ----------------------------------------------------------------
    public enum MentorshipStatus {
        PENDING,      // student requested, waiting for alumni acceptance
        ACCEPTED,     // alumni accepted
        REJECTED,     // alumni declined
        COMPLETED,    // mentorship ended successfully
        CANCELLED     // cancelled by either party
    }
}