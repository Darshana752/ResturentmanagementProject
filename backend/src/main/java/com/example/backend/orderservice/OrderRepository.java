package com.example.backend.orderservice;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.orderservice.*;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
