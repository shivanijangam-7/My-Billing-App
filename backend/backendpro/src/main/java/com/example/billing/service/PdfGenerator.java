package com.example.billing.service;

import org.springframework.stereotype.Service;

import com.example.billing.model.Invoice;

@Service
public class PdfGenerator {
    public byte[] generateInvoicePdf(Invoice invoice) {
        // Implement PDF generation logic here
        return new byte[0];
    }
}
