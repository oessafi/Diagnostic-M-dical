package com.twd.backend.service;

import com.twd.backend.entity.Appointment;
import com.twd.backend.entity.Doctor;
import com.twd.backend.entity.Patient;
import com.twd.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Méthode pour prendre un rendez-vous
    public Appointment createAppointment(Patient patient, Doctor doctor, LocalDateTime appointmentDate) {
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setStatus("en attente");  // Par défaut, le statut du rendez-vous est "en attente"
        return appointmentRepository.save(appointment);
    }
}
