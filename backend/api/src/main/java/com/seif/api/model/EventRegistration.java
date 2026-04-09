package com.seif.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Rich join entity between Event and Etudiant.
 * Replaces the simple @ManyToMany join table when we need to track
 * registration metadata: status, registration date, confirmation sent, etc.
 *
 * This is the source of truth for statistics and participant tracking
 * (one of the key features highlighted in the presentation).
 */
@Entity
@Table(
    name = "event_registrations",
    uniqueConstraints = @UniqueConstraint(
        name = "uq_event_registration",
        columnNames = {"event_id", "etudiant_id"}
    ),
    indexes = {
        @Index(name = "idx_reg_event",    columnList = "event_id"),
        @Index(name = "idx_reg_etudiant", columnList = "etudiant_id"),
        @Index(name = "idx_reg_status",   columnList = "status")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reg_seq")
    @SequenceGenerator(name = "reg_seq", sequenceName = "event_registration_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiant;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private RegistrationStatus status = RegistrationStatus.PENDING;

    /** True once confirmation email has been dispatched. */
    @Column(name = "confirmation_sent", nullable = false)
    @Builder.Default
    private boolean confirmationSent = false;

    /** True if the participant was actually present on event day. */
    @Column(name = "attended")
    private Boolean attended;

    @CreatedDate
    @Column(name = "registered_at", nullable = false, updatable = false)
    private LocalDateTime registeredAt;

    public enum RegistrationStatus {
        PENDING,
        CONFIRMED,
        CANCELLED,
        WAITLISTED
    }
}