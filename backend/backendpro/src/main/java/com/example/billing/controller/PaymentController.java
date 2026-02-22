package com.example.billing.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.billing.dto.Payments.CheckoutRequest;
import com.example.billing.model.Invoice;
import com.example.billing.model.Payment;
import com.example.billing.service.InvoiceService;
import com.example.billing.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest request) {
        Invoice invoice = invoiceService.getById(request.getInvoiceId());
        if (invoice == null) {
            return ResponseEntity.badRequest().body("Invalid Invoice");
        }

        Payment payment = new Payment();
        payment.setAmount(request.getAmount());
        payment.setMethod(request.getPaymentMethod());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setInvoice(invoice);

        paymentService.save(payment);
        return ResponseEntity.ok("Payment recorded");
    }
}
