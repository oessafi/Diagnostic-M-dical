package com.twd.backend.entity;

import jakarta.persistence.*;

@Entity
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String file;

    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private Users medecin;

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getFile() { return file; }

    public void setFile(String file) { this.file = file; }

    public Users getMedecin() { return medecin; }

    public void setMedecin(Users medecin) { this.medecin = medecin; }
}
