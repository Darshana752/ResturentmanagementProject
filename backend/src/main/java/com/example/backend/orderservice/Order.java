package com.example.backend.orderservice;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.userservice.Customer;

import jakarta.persistence.*;

@Entity
@Table(name = "orders") // ✅ maps this class to the 'orders' table
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  // ✅ Correct foreign key name — matches your SQL (customer_id)
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Customer customer;

  private String deliveryAddress;

  // ✅ Use LocalDateTime (modern, works perfectly with MySQL DATETIME)
  private LocalDateTime date;

  private String status;
  private Double amount;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> orderItems = new ArrayList<>();

  // ===== Getters and Setters =====

  public Long getOrderId() {
    return orderId;
  }

  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public String getDeliveryAddress() {
    return deliveryAddress;
  }

  public void setDeliveryAddress(String deliveryAddress) {
    this.deliveryAddress = deliveryAddress;
  }

  public LocalDateTime getDate() {
    return date;
  }

  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public List<OrderItem> getOrderItems() {
    return orderItems;
  }

  public void setOrderItems(List<OrderItem> orderItems) {
    this.orderItems = orderItems;
  }
}
