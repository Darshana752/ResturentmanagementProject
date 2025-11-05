package com.example.backend.userservice;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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

    // --- Check if admin ---
    Optional<Admin> adminOpt = adminRepository.findByEmailAndPassword(
        loginRequest.getEmail(),
        loginRequest.getPassword());

    if (adminOpt.isPresent()) {
      Admin admin = adminOpt.get();
      Map<String, Object> response = new HashMap<>();
      response.put("userId", admin.getUserId());
      response.put("name", admin.getName());
      response.put("email", admin.getEmail());
      response.put("role", "ADMIN");
      response.put("message", "Login successful");
      return ResponseEntity.ok(response);
    }

    // --- Check if customer ---
    Optional<Customer> customerOpt = customerRepository.findByEmailAndPassword(
        loginRequest.getEmail(),
        loginRequest.getPassword());

    if (customerOpt.isPresent()) {
      Customer customer = customerOpt.get();
      Map<String, Object> response = new HashMap<>();
      response.put("userId", customer.getUserId());
      response.put("name", customer.getName());
      response.put("email", customer.getEmail());
      response.put("role", "CUSTOMER");
      response.put("message", "Login successful");
      return ResponseEntity.ok(response);
    }

    // --- Invalid login ---
    return ResponseEntity.status(401).body(Map.of(
        "message", "Invalid email or password"));
  }
}
