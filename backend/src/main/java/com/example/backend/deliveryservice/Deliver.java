package com.example.backend.deliveryservice;

import jakarta.persistence.*;

@Entity
@Table(name = "deliver")
public class Deliver {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long deliveryId;

  @Column(name = "delivery_person", nullable = false)
  private String deliveryPerson;

  @Column(name = "contact_no")
  private String contactNo;

  @Column(name = "vehicle_no")
  private String vehicleNo;

  @Column(name = "order_id", nullable = false)
  private Long orderId;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  // Getters and Setters
  public Long getDeliveryId() {
    return deliveryId;
  }

  public void setDeliveryId(Long deliveryId) {
    this.deliveryId = deliveryId;
  }

  public String getDeliveryPerson() {
    return deliveryPerson;
  }

  public void setDeliveryPerson(String deliveryPerson) {
    this.deliveryPerson = deliveryPerson;
  }

  public String getContactNo() {
    return contactNo;
  }

  public void setContactNo(String contactNo) {
    this.contactNo = contactNo;
  }

  public String getVehicleNo() {
    return vehicleNo;
  }

  public void setVehicleNo(String vehicleNo) {
    this.vehicleNo = vehicleNo;
  }

  public Long getOrderId() {
    return orderId;
  }

  public void setOrderId(Long orderId) {
    this.orderId = orderId;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }
}
