package com.seif.api.model;

import com.seif.api.model.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(
    name = "users",
    indexes = {
        @Index(name = "idx_user_email", columnList = "email", unique = true),
        @Index(name = "idx_user_role",  columnList = "role")
    }
)
@Inheritance(strategy = InheritanceType.JOINED)

@EntityListeners(AuditingEntityListener.class)// Maps to "users" table in Postgres
@Getter @Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
                  
@NoArgsConstructor      // Lombok: generates no-args constructor
@AllArgsConstructor     // Lombok: generates all-args constructor
@Builder                // Lombok: enables User.builder().email("...").build()
public class User implements UserDetails {
    // UserDetails is a Spring Security interface — it tells Spring
    // "this object represents an authenticated user"

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // Will be stored HASHED, never plain text

    @Enumerated(EnumType.STRING) // Store "STUDENT"/"ALUMNI"/"ADMIN" as text
    @Column(nullable = false)
    private Role role;

    // Profile fields (nullable — filled in later)
    private String phone;
    private String bio;
    private String company;
    private String jobTitle;
    private String country;
    private String city;
    private Integer graduationYear;
    private String linkedinUrl;
    private String avatarUrl;
    private String sector;

    private boolean isActive = true;
    private boolean emailVerified = false;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist  // Called automatically BEFORE saving a new record
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate   // Called automatically BEFORE updating a record
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ============================================
    // UserDetails interface methods (Spring Security)
    // ============================================

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Tells Spring Security what role/permission this user has
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email; // We use email as the username
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return isActive; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return isActive; }
}
