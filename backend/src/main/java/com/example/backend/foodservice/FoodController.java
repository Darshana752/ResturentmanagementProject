package com.example.backend.foodservice;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:3000") // your React app origin
public class FoodController {

  @Autowired
  private FoodRepository foodRepository;

  // ✅ Get all foods
  @GetMapping
  public ResponseEntity<List<Food>> getAllFoods() {
    return ResponseEntity.ok(foodRepository.findAll());
  }

  // ✅ Get by ID
  @GetMapping("/{id}")
  public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
    return foodRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  // ✅ Add new food with image upload
  @PostMapping("/add")
  public ResponseEntity<?> addFood(
      @RequestParam("name") String name,
      @RequestParam("price") Double price,
      @RequestParam("category") String category,
      @RequestParam("ingredient") String ingredient,
      @RequestParam("description") String description,
      @RequestParam(value = "image", required = false) MultipartFile imageFile) {

    try {
      Food food = new Food();
      food.setName(name);
      food.setPrice(price);
      food.setCategory(category);
      food.setIngredient(ingredient);
      food.setDescription(description);

      // ✅ Handle image upload
      if (imageFile != null && !imageFile.isEmpty()) {
        // Create upload directory if missing
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists())
          dir.mkdirs();

        // Create unique filename
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        String filePath = uploadDir + fileName;

        // Save file to server
        imageFile.transferTo(new File(filePath));

        // Save filename to DB (not full path)
        food.setImage(fileName);
      }

      foodRepository.save(food);
      return ResponseEntity.ok("✅ Product added successfully!");

    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("❌ Image upload failed: " + e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("❌ Failed to add product: " + e.getMessage());
    }
  }

  // ✅ Update food
  @PutMapping("/{id}")
  public ResponseEntity<?> updateFood(
      @PathVariable Long id,
      @RequestParam("name") String name,
      @RequestParam("price") Double price,
      @RequestParam("category") String category,
      @RequestParam("ingredient") String ingredient,
      @RequestParam("description") String description,
      @RequestParam(value = "image", required = false) MultipartFile imageFile) {

    Optional<Food> optionalFood = foodRepository.findById(id);
    if (optionalFood.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Food not found");
    }

    try {
      Food food = optionalFood.get();
      food.setName(name);
      food.setPrice(price);
      food.setCategory(category);
      food.setIngredient(ingredient);
      food.setDescription(description);

      if (imageFile != null && !imageFile.isEmpty()) {
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists())
          dir.mkdirs();

        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        String filePath = uploadDir + fileName;

        imageFile.transferTo(new File(filePath));
        food.setImage(fileName);
      }

      foodRepository.save(food);
      return ResponseEntity.ok("✅ Product updated successfully!");

    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("❌ Image update failed: " + e.getMessage());
    }
  }

  // ✅ Delete food
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteFood(@PathVariable Long id) {
    if (!foodRepository.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Food not found");
    }
    foodRepository.deleteById(id);
    return ResponseEntity.ok("🗑 Food deleted successfully!");
  }
}
