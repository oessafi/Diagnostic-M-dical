package com.twd.backend.controller;

import com.twd.backend.entity.Reports;
import com.twd.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // Create a new report
    @PostMapping
    public ResponseEntity<Reports> createReport(@RequestBody Reports report) {
        Reports createdReport = reportService.createReport(report);
        return new ResponseEntity<>(createdReport, HttpStatus.CREATED);
    }

    // Get reports for a specific medecin (doctor)
    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<Reports>> getReportsByMedecin(@PathVariable Long medecinId) {
        List<Reports> reports = reportService.getReportsByMedecinId(medecinId);
        return reports.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Get a specific report by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Reports> getReportById(@PathVariable Long id) {
        Optional<Reports> report = reportService.getReportById(id);
        return report.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<Reports>> getAllReports() {
        List<Reports> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }
}
