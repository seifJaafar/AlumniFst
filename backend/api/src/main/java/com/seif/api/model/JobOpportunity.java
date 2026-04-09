package com.seif.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * JobOpportunity — a job or internship offer posted by an alumni.
 * Maps to the "Opportunités" module shown in slides 6 and 14.
 *
 * Relationships:
 *  - ManyToOne → Alumni (postedBy) — the alumni who created the listing
 */
@Entity
@Table(
    name = "job_opportunities",
    indexes = {
        @Index(name = "idx_job_type",    columnList = "job_type"),
        @Index(name = "idx_job_sector",  columnList = "sector"),
        @Index(name = "idx_job_status",  columnList = "status"),
        @Index(name = "idx_job_alumni",  columnList = "posted_by_id")
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class JobOpportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_seq")
    @SequenceGenerator(name = "job_seq", sequenceName = "job_opportunity_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    @NotBlank(message = "Job title is required")
    @Size(max = 200)
    @Column(name = "title", nullable = false, length = 200)
    @ToString.Include
    private String title;

    @NotBlank(message = "Company is required")
    @Size(max = 200)
    @Column(name = "company", nullable = false, length = 200)
    private String company;

    @Size(max = 200)
    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "is_remote", nullable = false)
    private boolean remote = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false, length = 20)
    private JobType jobType;

    /** Industry sector — enables the "Sector" filter on the opportunities page. */
    @Size(max = 100)
    @Column(name = "sector", length = 100)
    private String sector;

    /** Salary range, stored as a display string e.g. "$120k – $150k". */
    @Size(max = 100)
    @Column(name = "salary_range", length = 100)
    private String salaryRange;

    @Size(max = 5000)
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @Column(name = "application_url", length = 500)
    private String applicationUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private OpportunityStatus status = OpportunityStatus.ACTIVE;

    // ----------------------------------------------------------------
    // The alumni who published this opportunity
    // ----------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "posted_by_id", nullable = false)
    private Alumni postedBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum JobType {
        FULL_TIME,
        PART_TIME,
        INTERNSHIP,
        FREELANCE,
        CONTRACT
    }

    public enum OpportunityStatus {
        ACTIVE,
        FILLED,
        EXPIRED
    }
}