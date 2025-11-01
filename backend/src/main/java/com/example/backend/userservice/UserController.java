package com.example.backend.userservice;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

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
}
