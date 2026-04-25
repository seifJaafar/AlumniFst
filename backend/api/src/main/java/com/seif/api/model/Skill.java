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
// Skill.java
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "Skill name is required")
    @Size(min = 1, max = 100, message = "Skill name must be between 1 and 100 characters")
    @Column(name = "name", nullable = false, unique = true, length = 100)
    @ToString.Include
    private String name;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Column(name = "category", length = 100)
    private String category;

    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<User> users = new HashSet<>();
}