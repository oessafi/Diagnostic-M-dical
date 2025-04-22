package com.twd.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;  // Patient qui prend le rendez-vous

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;  // Médecin avec qui le rendez-vous est pris

    private LocalDateTime appointmentDate;  // Date et heure du rendez-vous

    private String status;  // Par exemple : "en attente", "confirmé", "annulé"
}
