package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Admin — a staff member who validates registrations and manages the platform.
 * Extends User (JOINED table: "admins").
 *
 * A SuperAdmin has elevated privileges (managed through the Role enum on User).
 *
 * Relationships:
 *  - One Admin → Many Events (managed events)
 *  - One Admin validates Many Users (alumni / etudiants)
 */
@Entity
@Table(name = "admins")
@DiscriminatorValue("ADMIN")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
@NoArgsConstructor
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Admin extends User {

    /**
     * Administrative information / notes about this admin
     * (e.g. department, title).
     */
    @Size(max = 500)
    @Column(name = "informations", columnDefinition = "TEXT")
    private String informations;

    /**
     * Department or faculty unit this admin belongs to.
     * Useful for scoping event and data management.
     */
    @Size(max = 150)
    @Column(name = "department", length = 150)
    private String department;

    // ----------------------------------------------------------------
    // Events this admin manages (created or moderated by admin)
    // ----------------------------------------------------------------
    @OneToMany(
        mappedBy = "managedBy",
        cascade  = {CascadeType.PERSIST, CascadeType.MERGE},
        fetch    = FetchType.LAZY
    )
    private List<Event> managedEvents = new ArrayList<>();
}