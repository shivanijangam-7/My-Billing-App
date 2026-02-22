package com.example.billing.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.billing.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Add any custom query methods if needed
}
