package com.example.backend.deliveryservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliver")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliverController {

  @Autowired
  private DeliverRepository deliverRepository;

  // -----------------------
  // Get all deliveries
  // -----------------------
  @GetMapping
  public List<Deliver> getAllDeliveries() {
    return deliverRepository.findAll();
  }

  // -----------------------
  // Get delivery by ID
  // -----------------------
  @GetMapping("/{id}")
  public Deliver getDeliveryById(@PathVariable Long id) {
    return deliverRepository.findById(id).orElse(null);
  }

  // -----------------------
  // Create new delivery
  // -----------------------
  @PostMapping
  public Deliver createDelivery(@RequestBody Deliver deliver) {
    // Validate required fields
    if (deliver.getDeliveryPerson() == null || deliver.getDeliveryPerson().isEmpty()) {
      throw new IllegalArgumentException("Delivery person is required");
    }
    if (deliver.getOrderId() == null) {
      throw new IllegalArgumentException("Order ID is required");
    }
    if (deliver.getUserId() == null) {
      throw new IllegalArgumentException("User ID is required");
    }

    // Optional fields: contactNo, vehicleNo can be null
    return deliverRepository.save(deliver);
  }

  // -----------------------
  // Update delivery
  // -----------------------
  @PutMapping("/{id}")
  public Deliver updateDelivery(@PathVariable Long id, @RequestBody Deliver updatedDeliver) {
    return deliverRepository.findById(id).map(deliver -> {
      deliver.setDeliveryPerson(updatedDeliver.getDeliveryPerson());
      deliver.setContactNo(updatedDeliver.getContactNo());
      deliver.setVehicleNo(updatedDeliver.getVehicleNo());
      deliver.setOrderId(updatedDeliver.getOrderId());
      deliver.setUserId(updatedDeliver.getUserId());
      return deliverRepository.save(deliver);
    }).orElse(null);
  }

  // -----------------------
  // Delete delivery
  // -----------------------
  @DeleteMapping("/{id}")
  public String deleteDelivery(@PathVariable Long id) {
    deliverRepository.deleteById(id);
    return "Delivery removed with id: " + id;
  }
}
