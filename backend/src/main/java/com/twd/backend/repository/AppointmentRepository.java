package com.twd.backend.repository;

import com.twd.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Tu peux ajouter des méthodes personnalisées, par exemple, pour récupérer les rendez-vous d'un patient
}
