package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(
    name = "events",
    indexes = {
        @Index(name = "idx_event_date",   columnList = "event_date"),
        @Index(name = "idx_event_type",   columnList = "type"),
        @Index(name = "idx_event_status", columnList = "status")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_seq")
    @SequenceGenerator(name = "event_seq", sequenceName = "event_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    @NotBlank(message = "Event title is required")
    @Size(max = 200)
    @Column(name = "title", nullable = false, length = 200)
    @ToString.Include
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 30)
    private EventType type;

    @NotNull(message = "Event date is required")
    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Size(max = 200)
    @Column(name = "location", length = 200)
    private String location;

    /** True when the event is held online. */
    @Column(name = "is_online", nullable = false)
    private boolean online = false;

    @Size(max = 5000)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    /** Maximum attendees. Null = unlimited. */
    @Min(1)
    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private EventStatus status = EventStatus.UPCOMING;

    // ----------------------------------------------------------------
    // Agenda items (embedded, stored in "event_agenda_items")
    // ----------------------------------------------------------------
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "event_agenda_items",
        joinColumns = @JoinColumn(name = "event_id")
    )
    @OrderColumn(name = "item_order")
    @Builder.Default
    private List<AgendaItem> agendaItems = new ArrayList<>();

    // ----------------------------------------------------------------
    // Creator (alumni who published this event)
    // ----------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_alumni_id")
    private Alumni createdBy;

    // ----------------------------------------------------------------
    // Optional admin who manages / moderates this event
    // ----------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managed_by_admin_id")
    private Admin managedBy;

    // ----------------------------------------------------------------
    // Participants (Etudiants who registered)
    // ----------------------------------------------------------------
    @ManyToMany(mappedBy = "registeredEvents", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Etudiant> participants = new HashSet<>();

    // ----------------------------------------------------------------
    // Rich registration records (for statistics / participant tracking)
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "event",
        cascade  = CascadeType.ALL,
        orphanRemoval = true,
        fetch    = FetchType.LAZY
    )
    @Builder.Default
    private List<EventRegistration> registrations = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ----------------------------------------------------------------
    // Enums
    // ----------------------------------------------------------------
    public enum EventType {
        NETWORKING,
        WORKSHOP,
        REUNION,
        CONFERENCE,
        WEBINAR,
        OTHER
    }

    public enum EventStatus {
        UPCOMING,
        ONGOING,
        PAST,
        CANCELLED
    }
}