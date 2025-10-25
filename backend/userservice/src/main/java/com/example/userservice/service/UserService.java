package com.example.userservice.service;

import com.example.userservice.entity.Admin;
import com.example.userservice.entity.Customer;
import com.example.userservice.repository.AdminRepository;
import com.example.userservice.repository.CustomerRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
  private final CustomerRepository customerRepo;
  private final AdminRepository adminRepo;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public UserService(CustomerRepository customerRepo, AdminRepository adminRepo) {
    this.customerRepo = customerRepo;
    this.adminRepo = adminRepo;
  }

  // Customer Registration
  public Customer registerCustomer(Customer c) {
    c.setPassword(encoder.encode(c.getPassword()));
    return customerRepo.save(c);
  }

  // Admin Registration
  public Admin registerAdmin(Admin a) {
    a.setPassword(encoder.encode(a.getPassword()));
    return adminRepo.save(a);
  }

  // Customer Login
  public Optional<Customer> loginCustomer(String email, String password) {
    Optional<Customer> user = customerRepo.findByEmail(email);
    if (user.isPresent() && encoder.matches(password, user.get().getPassword())) {
      return user;
    }
    return Optional.empty();
  }

  // Admin Login
  public Optional<Admin> loginAdmin(String email, String password) {
    Optional<Admin> admin = adminRepo.findByEmail(email);
    if (admin.isPresent() && encoder.matches(password, admin.get().getPassword())) {
      return admin;
    }
    return Optional.empty();
  }
}
