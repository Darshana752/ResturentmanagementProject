package com.example.backend.userservice;

public class LoginRequest {

  private String email;
  private String password;

  // Default constructor (required by Spring)
  public LoginRequest() {
  }

  // Constructor with parameters (optional)
  public LoginRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  // Getters and setters
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
