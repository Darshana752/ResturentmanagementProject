package com.example.backend.orderservice;

import com.example.backend.userservice.Customer;
import com.example.backend.userservice.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private CustomerRepository customerRepository; // ✅ Add this

  // ✅ Place a new order safely
  @PostMapping("/place")
  public ResponseEntity<?> placeOrder(@RequestBody Order order) {
    try {
      // ✅ Load the real customer from DB
      if (order.getCustomer() == null || order.getCustomer().getUserId() == null) {
        return ResponseEntity.badRequest().body("❌ Missing customer ID.");
      }

      Long customerId = order.getCustomer().getUserId();
      Customer existingCustomer = customerRepository.findById(customerId)
          .orElseThrow(() -> new RuntimeException("❌ Customer not found with ID: " + customerId));

      // ✅ Attach the managed customer entity
      order.setCustomer(existingCustomer);

      // ✅ Set order details
      order.setDate(LocalDateTime.now());
      order.setStatus("Pending");

      // ✅ Calculate total & link items
      double total = 0.0;
      if (order.getOrderItems() != null) {
        for (OrderItem item : order.getOrderItems()) {
          total += item.getQuantity() * item.getPriceAtPurchase();
          item.setOrder(order);
        }
      }
      order.setAmount(total);

      // ✅ Save order (cascade saves order items)
      Order savedOrder = orderRepository.save(order);
      return ResponseEntity.ok(savedOrder);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("❌ Failed to place order: " + e.getMessage());
    }
  }

  // ✅ Get all orders
  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    return ResponseEntity.ok(orders);
  }

  // ✅ Get a single order by ID
  @GetMapping("/{id}")
  public ResponseEntity<?> getOrderById(@PathVariable Long id) {
    Optional<Order> order = orderRepository.findById(id);
    if (order.isPresent()) {
      return ResponseEntity.ok(order.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("❌ Order not found with ID: " + id);
    }
  }

  // ✅ Delete order by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
    if (orderRepository.existsById(id)) {
      orderRepository.deleteById(id);
      return ResponseEntity.ok("✅ Order deleted successfully");
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("❌ Order not found with ID: " + id);
    }
  }

  // ✅ Update order status
  @PutMapping("/{id}/status")
  public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
    Optional<Order> optionalOrder = orderRepository.findById(id);
    if (optionalOrder.isPresent()) {
      Order order = optionalOrder.get();
      order.setStatus(status);
      Order updatedOrder = orderRepository.save(order);
      return ResponseEntity.ok(updatedOrder);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body("❌ Order not found with ID: " + id);
    }
  }
}
