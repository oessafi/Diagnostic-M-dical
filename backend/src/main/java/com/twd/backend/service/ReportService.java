package com.twd.backend.service;

import com.twd.backend.entity.Reports;
import com.twd.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Create a new report
    public Reports createReport(Reports report) {
        report.setCreatedAt(System.currentTimeMillis()); // Setting current timestamp
        return reportRepository.save(report);
    }

    // Get all reports for a specific medecin
    public List<Reports> getReportsByMedecinId(Long medecinId) {
        return reportRepository.findByMedecinId(medecinId);
    }

    // Get a specific report by its ID
    public Optional<Reports> getReportById(Long id) {
        return reportRepository.findById(id);
    }
    public List<Reports> getAllReports() {
        return reportRepository.findAll();
    }

    // Optionally add more methods if necessary (e.g., delete report, update report, etc.)
}