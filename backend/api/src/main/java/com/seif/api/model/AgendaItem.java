package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Embeddable value object for a single item in an event's agenda.
 * Stored in "event_agenda_items" via @ElementCollection on Event.
 */
@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class AgendaItem {

    /** Time label, e.g. "19:00". */
    @NotBlank
    @Size(max = 10)
    @Column(name = "time_label", nullable = false, length = 10)
    private String timeLabel;

    /** Activity description, e.g. "Speed Networking Sessions". */
    @NotBlank
    @Size(max = 300)
    @Column(name = "activity", nullable = false, length = 300)
    private String activity;
}