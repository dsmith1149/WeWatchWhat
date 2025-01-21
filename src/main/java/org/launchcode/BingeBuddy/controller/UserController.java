package org.launchcode.BingeBuddy.controller;


import org.launchcode.BingeBuddy.data.UserRepository;
import org.launchcode.BingeBuddy.model.LoginRequest;
import org.launchcode.BingeBuddy.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestParam String email,
                                                            @RequestParam(required = false) String username,
                                                            @RequestParam(required = false) String firstName,
                                                            @RequestParam(required = false) String lastName) {
        // Create a new user entity
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username != null ? username : email); // Default username to email if not provided
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);


        User savedUser = userRepository.save(newUser);

        // Return user ID and success message
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully.");
        response.put("userId", savedUser.getId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/userdetails")
    public ResponseEntity<String> addUserDetails(@RequestParam Integer userId,
                                                 @RequestParam(required = false) String genre,
                                                 @RequestParam(required = false) String anotherGenre) {
        // Fetch the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        // Update user details
        User user = userOptional.get();
        if (genre != null) user.setGenre(genre);
        if (anotherGenre != null) user.setAnotherGenre(anotherGenre);

        // Save the updated user
        userRepository.save(user);

        return ResponseEntity.ok("User details updated successfully.");
    }


    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/add-test-user")
    public ResponseEntity<String> addTestUser() {
        Optional<User> existingUser = userRepository.findById(1);
        if (existingUser.isEmpty()) {
            User testUser = new User();
            testUser.setEmail("test@example.com");
            testUser.setUsername("testuser");
            testUser.setFirstName("Test");
            testUser.setLastName("User");
            testUser.setGenre("Action");
            testUser.setAnotherGenre("Comedy");

            userRepository.save(testUser);
            return ResponseEntity.ok("Test user added with ID " + testUser.getId());
        } else {
            return ResponseEntity.ok("Test user already exists at ID 1");
        }
    }

    @PutMapping("update/{userId}")
    public ResponseEntity<User> updateUserDetails(@PathVariable Integer userId,
                                                  @RequestParam(required = false) String email,
                                                  @RequestParam(required = false) String username,
                                                  @RequestParam(required = false) String firstName,
                                                  @RequestParam(required = false) String lastName,
                                                  @RequestParam(required = false) String genre,
                                                  @RequestParam(required = false) String anotherGenre) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (email != null) user.setEmail(email);
            if (username != null) user.setUsername(username);
            if (firstName != null) user.setFirstName(firstName);
            if (lastName != null) user.setLastName(lastName);
            if (genre != null) user.setGenre(genre);
            if (anotherGenre != null) user.setAnotherGenre(anotherGenre);

            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<User> deleteUserById(@PathVariable Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<User> searchUserByEmailOrUsername(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String username) {
        Optional<User> user;

        if (email != null) {
            user = userRepository.findByEmail(email);
        } else if (username != null) {
            user = userRepository.findByUsername(username);
        } else {
            return ResponseEntity.badRequest().body(null);
        }

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }






}

