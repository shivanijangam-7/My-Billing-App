package com.example.billing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.billing.model.Invoice;
import com.example.billing.repo.InvoiceRepository;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    public Invoice getById(Long id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Invoice not found"));
    }
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll(); // fetches all invoices from DB
    }


    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }
}
