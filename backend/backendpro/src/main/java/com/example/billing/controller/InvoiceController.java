package com.example.billing.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.billing.dto.InvoiceRequest;
import com.example.billing.model.Invoice;
import com.example.billing.model.InvoiceItem;
import com.example.billing.model.Product;
import com.example.billing.service.CustomerService;
import com.example.billing.service.InvoiceService;
import com.example.billing.service.ProductService;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    // ✅ Fetch all invoices
    @GetMapping
    public ResponseEntity<List<Invoice>> getInvoices() {
        return ResponseEntity.ok(invoiceService.getAll());
    }
    @GetMapping("/api/invoices")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }


    // ✅ Create new invoice
    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceRequest request) {
        try {
            Invoice invoice = new Invoice();
            invoice.setCustomer(customerService.getById(request.getCustomerId())); // throws if not found
            invoice.setDueDate(request.getDueDate());

            List<InvoiceItem> items = new ArrayList<>();
            double total = 0.0;

            if (request.getItems() != null) {
                for (InvoiceRequest.InvoiceItemRequest iir : request.getItems()) {
                    InvoiceItem invoiceItem = new InvoiceItem();
                    invoiceItem.setQuantity(iir.getQuantity());

                    if (iir.getProductId() != null) {
                    	Product product = productService.getProductById(iir.getProductId());

                        invoiceItem.setName(product.getName());
                        invoiceItem.setPrice(product.getPrice());
                    } else {
                        invoiceItem.setName(iir.getName());
                        invoiceItem.setPrice(iir.getPrice());
                    }

                    total += invoiceItem.getPrice() * invoiceItem.getQuantity();
                    invoiceItem.setInvoice(invoice);
                    items.add(invoiceItem);
                }
            }

            invoice.setInvoiceItems(items);
            invoice.setTotal(total);

            // ✅ Generate invoice number
            invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());

            Invoice savedInvoice = invoiceService.save(invoice);
            return ResponseEntity.ok(savedInvoice);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating invoice: " + e.getMessage());
        }
    }

    // ✅ Delete invoice by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Long id) {
        try {
            invoiceService.delete(id);
            return ResponseEntity.ok("Invoice deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting invoice: " + e.getMessage());
        }
    }
}
