package com.example.backend.userservice;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/register")
@CrossOrigin
public class UserController {

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private CustomerRepository customerRepository;

  // --- Register Admin ---
  @PostMapping("/admin")
  public Admin registerAdmin(@RequestBody Admin admin) {
    admin.setRole("ADMIN");
    System.out.println("Registered Admin: " + admin.getName());
    return adminRepository.save(admin);
  }

  // --- Register Customer ---
  @PostMapping("/customer")
  public Customer registerCustomer(@RequestBody Customer customer) {
    customer.setRole("CUSTOMER");
    System.out.println("Registered Customer: " + customer.getName());
    return customerRepository.save(customer);
  }

  // --- Login (email + password) ---
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

    // Check admin
    var adminOpt = adminRepository.findByEmailAndPassword(
        loginRequest.getEmail(),
        loginRequest.getPassword());

    if (adminOpt.isPresent()) {
      Admin admin = adminOpt.get();
      // Return JSON with role and name
      return ResponseEntity.ok(Map.of(
          "role", "ADMIN",
          "name", admin.getName(),
          "message", "Login successful"));
    }

    // Check customer
    var customerOpt = customerRepository.findByEmailAndPassword(
        loginRequest.getEmail(),
        loginRequest.getPassword());

    if (customerOpt.isPresent()) {
      Customer customer = customerOpt.get();
      return ResponseEntity.ok(Map.of(
          "role", "CUSTOMER",
          "name", customer.getName(),
          "message", "Login successful"));
    }

    // Invalid login
    return ResponseEntity.status(401).body(Map.of(
        "message", "Invalid email or password"));
  }
}
