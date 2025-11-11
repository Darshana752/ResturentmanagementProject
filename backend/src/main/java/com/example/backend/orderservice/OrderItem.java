package com.example.backend.orderservice;

import com.example.backend.foodservice.Food;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "order_item")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderItemId;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonBackReference // ✅ Back reference - will NOT serialize order (breaks cycle)
  private Order order;

  @ManyToOne
  @JoinColumn(name = "food_id", nullable = false)
  private Food food;

  private int quantity;
  private double priceAtPurchase;

  // ===== Getters and Setters =====
  public Long getOrderItemId() {
    return orderItemId;
  }

  public void setOrderItemId(Long orderItemId) {
    this.orderItemId = orderItemId;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Food getFood() {
    return food;
  }

  public void setFood(Food food) {
    this.food = food;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public double getPriceAtPurchase() {
    return priceAtPurchase;
  }

  public void setPriceAtPurchase(double priceAtPurchase) {
    this.priceAtPurchase = priceAtPurchase;
  }
}