package com.example.backend.userservice;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Table;
import java.sql.Date; // for date of birth

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

  // getters and setters
}
