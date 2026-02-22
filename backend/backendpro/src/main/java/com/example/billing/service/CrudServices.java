//package com.example.billing.service;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CrudServices<T> {
//
//  private final JpaRepository<T, Long> repository;
//
//  public CrudServices(JpaRepository<T, Long> repository) {
//    this.repository = repository;
//  }
//
//  public List<T> getAll() {
//    return repository.findAll();
//  }
//
//  public Optional<T> getById(Long id) {
//    return repository.findById(id);
//  }
//
//  public T create(T entity) {
//    return repository.save(entity);
//  }
//
//  public Optional<T> update(Long id, T entity) {
//    if (!repository.existsById(id)) {
//      return Optional.empty();
//    }
//    return Optional.of(repository.save(entity));
//  }
//
//  public boolean delete(Long id) {
//    if (!repository.existsById(id)) {
//      return false;
//    }
//    repository.deleteById(id);
//    return true;
//  }
//}
