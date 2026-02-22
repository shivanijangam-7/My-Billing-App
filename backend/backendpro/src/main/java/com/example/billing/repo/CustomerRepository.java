package com.example.billing.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.billing.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Add any custom query methods if needed
}
