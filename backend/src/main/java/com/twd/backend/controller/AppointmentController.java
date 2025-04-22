package com.twd.backend.controller;

import com.twd.backend.entity.Appointment;
import com.twd.backend.entity.Doctor;
import com.twd.backend.entity.Patient;
import com.twd.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Créer un rendez-vous
    @PostMapping("/create")
    public Appointment createAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String dateTime) {

        // Convertir la chaîne de caractère en LocalDateTime
        LocalDateTime appointmentDate = LocalDateTime.parse(dateTime);

        // Ici, tu récupères le Patient et le Doctor à partir de leur ID
        Patient patient = new Patient();  // Ici, tu devrais récupérer l'objet Patient depuis ta base de données
        Doctor doctor = new Doctor();  // Idem pour le médecin

        // Appel à la méthode de service pour créer un rendez-vous
        return appointmentService.createAppointment(patient, doctor, appointmentDate);
    }
}
