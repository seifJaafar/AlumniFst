package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Embeddable value object for a single education entry.
 * Stored in "alumni_studies" via @ElementCollection on Alumni.
 * Models the LinkedIn "Education" section.
 */
@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class Study {

    /** e.g. "Université de Tunis El Manar", "ESPRIT", "INSAT" */
    @NotBlank(message = "Institution name is required")
    @Size(max = 200)
    @Column(name = "institution", nullable = false, length = 200)
    private String institution;

    /** e.g. "Licence", "Master", "Ingénieur", "Doctorat", "BTS" */
    @Size(max = 100)
    @Column(name = "degree", length = 100)
    private String degree;

    /** e.g. "Informatique", "Génie Logiciel", "Réseaux & Télécoms" */
    @Size(max = 200)
    @Column(name = "field_of_study", length = 200)
    private String fieldOfStudy;

    /** Format: "YYYY-MM" */
    @Column(name = "start_date", length = 7)
    private String startDate;

    /** Format: "YYYY-MM" — null if currently enrolled */
    @Column(name = "end_date", length = 7)
    private String endDate;

    @Column(name = "is_current")
    private boolean current;

    /** Grade or mention, e.g. "Mention Très Bien", "15.4/20", "GPA 3.8" */
    @Size(max = 100)
    @Column(name = "grade", length = 100)
    private String grade;

    /** Activities, clubs, associations, e.g. "Club Robotique, Junior Entreprise" */
    @Size(max = 500)
    @Column(name = "activities", length = 500)
    private String activities;

    /** Thesis title, notable projects, or extra context */
    @Size(max = 1000)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}