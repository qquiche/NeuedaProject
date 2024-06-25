package com.example.demo.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
        @Autowired
        private UserRepository userRepository;
    
        @CrossOrigin(origins = "http://localhost:3000")
        @GetMapping
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        public List<User> getUserByPage(int page, int entriesPerPage) {
            List<User> users = userRepository.findAll();
            List<User> result = new ArrayList<User>();
            int start = (page - 1) * entriesPerPage;
            int end = Math.min(page * entriesPerPage, users.size());
            for (int i = start; i < end; i++) {
                result.add(users.get(i));
            }
            return result;
        }

        @CrossOrigin(origins = "http://localhost:3000")
        @GetMapping("/id")
        public List<User> getUserByID(Long id) {
            List<User> users = userRepository.findAll();
            List<User> result = new ArrayList<User>();
            for (User user : users) {
                if (user.getId().equals(id)) {
                    result.add(user);
                    break;
                }
            }
            return result;
        }

        // POST user
        @CrossOrigin(origins = "http://localhost:3000")
        @PostMapping
        public ResponseEntity<User> postUser(@RequestBody User user) {
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }

        // Update user by buying/selling stock
        @CrossOrigin(origins = "http://localhost:3000")
        @PutMapping("/{id}/stock/{stockID}")
        public ResponseEntity<User> updateUserStock(Long id, Long stockID, int quantity) {
            List<User> users = userRepository.findAll();
            for (User user : users) {
                if (user.getId().equals(id)) {
                    user.buyStock(stockID, quantity);
                    userRepository.save(user);
                    return ResponseEntity.ok(user);
                }
            }
            return ResponseEntity.notFound().build();
        }

}
