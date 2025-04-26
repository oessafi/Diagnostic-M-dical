package com.twd.backend.repository;

import com.twd.backend.entity.Reports;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Reports, Long> {

    // Fetch reports for a specific medecin (doctor) by their ID
    List<Reports> findByMedecinId(Long medecinId);
}