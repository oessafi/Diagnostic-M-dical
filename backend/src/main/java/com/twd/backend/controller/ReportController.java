package com.twd.backend.controller;

import com.twd.backend.entity.Reports;
import com.twd.backend.entity.Users;
import com.twd.backend.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody Reports reportData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof Users)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        Users authenticatedUser = (Users) authentication.getPrincipal();

        try {
            Reports saved = reportService.saveReportAsAuthenticatedUser(reportData, authenticatedUser);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only medecins can create reports");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving report");
        }
    }

    @GetMapping
    public List<Reports> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/medecin/{medecinId}")
    public List<Reports> getReportsByMedecin(@PathVariable Long medecinId) {
        return reportService.getReportsByMedecin(medecinId);
    }
}
