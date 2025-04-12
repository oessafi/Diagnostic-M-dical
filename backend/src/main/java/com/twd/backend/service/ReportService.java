package com.twd.backend.service;

import com.twd.backend.entity.Reports;
import com.twd.backend.entity.Role;
import com.twd.backend.entity.Users;
import com.twd.backend.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Reports saveReportAsAuthenticatedUser(Reports reportData, Users user) {
        if (!Role.MEDECIN.equals(user.getRole())) {
            throw new IllegalArgumentException("User must have role MEDECIN");
        }

        Reports report = new Reports();
        report.setName(reportData.getName());
        report.setFile(reportData.getFile());
        report.setMedecin(user);

        return reportRepository.save(report);
    }

    public List<Reports> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Reports> getReportsByMedecin(Long medecinId) {
        return reportRepository.findByMedecinId(medecinId);
    }
}
