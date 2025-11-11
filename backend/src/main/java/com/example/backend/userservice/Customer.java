package com.example.backend.userservice;

import java.util.List;

import com.example.backend.orderservice.Order;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "customer")
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {

  private String homeNo;
  private String street;
  private String city;

  @OneToMany(mappedBy = "customer")
  @JsonBackReference // ✅ Back reference - will NOT serialize orders (breaks cycle)
  private List<Order> orders;

  // getters and setters for homeNo, street, city are handled by Lombok
}
