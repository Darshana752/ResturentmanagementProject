package com.example.userservice.controller;

import com.example.userservice.entity.Admin;
import com.example.userservice.entity.Customer;
import com.example.userservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {
  private final UserService UserService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // ✅ Customer Registration
  @PostMapping("/register/customer")
  public ResponseEntity<?> registerCustomer(@RequestBody Customer c) {
    return ResponseEntity.ok(authService.registerCustomer(c));
  }

  // ✅ Admin Registration
  @PostMapping("/register/admin")
  public ResponseEntity<?> registerAdmin(@RequestBody Admin a) {
    return ResponseEntity.ok(authService.registerAdmin(a));
  }

  // ✅ Customer Login
  @PostMapping("/login/customer")
  public ResponseEntity<?> loginCustomer(@RequestBody Map<String, String> req) {
    return authService.loginCustomer(req.get("email"), req.get("password"))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(401).body("Invalid email or password"));
  }

  // ✅ Admin Login
  @PostMapping("/login/admin")
  public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> req) {
    return authService.loginAdmin(req.get("email"), req.get("password"))
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(401).body("Invalid email or password"));
  }
}
