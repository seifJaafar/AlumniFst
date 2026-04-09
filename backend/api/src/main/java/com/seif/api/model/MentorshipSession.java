package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * MentorshipSession — a single recorded session within a Mentorship.
 * Enables the "historique des sessions de mentorat" feature described
 * in slide 5 of the presentation.
 */
@Entity
@Table(
    name = "mentorship_sessions",
    indexes = {
        @Index(name = "idx_session_mentorship", columnList = "mentorship_id"),
        @Index(name = "idx_session_date",       columnList = "session_date")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MentorshipSession {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "session_seq")
    @SequenceGenerator(name = "session_seq", sequenceName = "mentorship_session_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "mentorship_id", nullable = false)
    private Mentorship mentorship;

    @NotNull(message = "Session date is required")
    @Column(name = "session_date", nullable = false)
    private LocalDateTime sessionDate;

    /** Duration in minutes. */
    @Min(1)
    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(name = "format", nullable = false, length = 20)
    @Builder.Default
    private SessionFormat format = SessionFormat.ONLINE;

    /** Topics or goals discussed during this session. */
    @Size(max = 2000)
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    /** Optional action items agreed upon. */
    @Size(max = 1000)
    @Column(name = "action_items", columnDefinition = "TEXT")
    private String actionItems;

    @CreatedDate
    @Column(name = "logged_at", nullable = false, updatable = false)
    private LocalDateTime loggedAt;

    public enum SessionFormat {
        ONLINE,
        IN_PERSON
    }
}