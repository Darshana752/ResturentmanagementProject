package com.example.backend.foodservice;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.*;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
