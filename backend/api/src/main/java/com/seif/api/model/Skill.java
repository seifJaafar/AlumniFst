package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Skill — a tag-like entity representing a professional skill.
 * Shared across alumni profiles (M:N via alumni_skills).
 *
 * Examples: "React", "Spring Boot", "Machine Learning", "Data Analysis".
 */
@Entity
@Table(
    name = "skills",
    indexes = {
        @Index(name = "idx_skill_name", columnList = "name", unique = true)
    }
)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_seq")
    @SequenceGenerator(name = "skill_seq", sequenceName = "skill_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "Skill name is required")
    @Size(max = 100)
    @Column(name = "name", nullable = false, unique = true, length = 100)
    @ToString.Include
    private String name;

    /** Category grouping, e.g. "Programming", "Management", "Design". */
    @Size(max = 100)
    @Column(name = "category", length = 100)
    private String category;

    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY)
    private Set<Alumni> alumni = new HashSet<>();
}