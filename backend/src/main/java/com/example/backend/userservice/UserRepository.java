package com.example.backend.userservice;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.*;

public interface UserRepository extends JpaRepository<User, Long> {
}