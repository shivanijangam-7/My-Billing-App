//package com.example.billing.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.billing.model.Customer;
//import com.example.billingapp.service.CrudService;
//
//@RestController
//@RequestMapping("/api/customers")
//public class CrudController {
//
//  @Autowired
//  private CrudService<Customer> customerService;
//
//  @GetMapping
//  public List<Customer> getAll() {
//    return customerService.getAll();
//  }
//
//  @GetMapping("/{id}")
//  public ResponseEntity<Customer> getById(@PathVariable Long id) {
//    return customerService.getById(id)
//        .map(ResponseEntity::ok)
//        .orElse(ResponseEntity.notFound().build());
//  }
//
//  @PostMapping
//  public Customer create(@RequestBody Customer customer) {
//    return customerService.create(customer);
//  }
//
//  @PutMapping("/{id}")
//  public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer customer) {
//    return customerService.update(id, customer)
//        .map(ResponseEntity::ok)
//        .orElse(ResponseEntity.notFound().build());
//  }
//
//  @DeleteMapping("/{id}")
//  public ResponseEntity<Void> delete(@PathVariable Long id) {
//    if (customerService.delete(id)) {
//      return ResponseEntity.ok().build();
//    }
//    return ResponseEntity.notFound().build();
//  }
//}
