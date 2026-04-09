package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Notification — in-app notification for a user.
 * Covers: new event published, mentorship request received/accepted,
 * new opportunity posted, account validated, etc.
 *
 * Shown in the UI mockups (bell icon with badge count on slides 12–17).
 */
@Entity
@Table(
    name = "notifications",
    indexes = {
        @Index(name = "idx_notif_user",   columnList = "recipient_id"),
        @Index(name = "idx_notif_read",   columnList = "is_read"),
        @Index(name = "idx_notif_type",   columnList = "type")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notif_seq")
    @SequenceGenerator(name = "notif_seq", sequenceName = "notification_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    /** The user who receives this notification. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 40)
    private NotificationType type;

    @NotBlank
    @Size(max = 500)
    @Column(name = "message", nullable = false, length = 500)
    private String message;

    /** Generic reference ID (eventId, mentorshipId, jobId, etc.). */
    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "is_read", nullable = false)
    @Builder.Default
    private boolean read = false;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum NotificationType {
        NEW_EVENT,
        EVENT_REGISTRATION_CONFIRMED,
        MENTORSHIP_REQUEST_RECEIVED,
        MENTORSHIP_REQUEST_ACCEPTED,
        MENTORSHIP_REQUEST_REJECTED,
        NEW_JOB_OPPORTUNITY,
        ACCOUNT_VALIDATED,
        NEW_MESSAGE
    }
}