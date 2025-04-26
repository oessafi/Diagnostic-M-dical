package com.twd.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "reports")
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "medecin_id", referencedColumnName = "id", nullable = false)
    private Users medecin; // Relating Report to the "Medecin" (doctor) which is a user with the "MEDECIN" role

    @Column(name = "created_at", nullable = false)
    private Long createdAt;

    // Optional: Additional fields can be added if needed (e.g., report date, status, etc.)
}
