package com.clothing.backend.controller;

import com.clothing.backend.dto.AuthResponse;
import com.clothing.backend.dto.SellerApplyRequest;
import com.clothing.backend.entity.Role;
import com.clothing.backend.entity.User;
import com.clothing.backend.repository.UserRepository;
import com.clothing.backend.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public SellerController(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/apply")
    public ResponseEntity<AuthResponse> apply(@RequestBody SellerApplyRequest request) {
        // Try to get current user from JWT, fallback to provided email for MVP
        String email = resolveEmailFromContext().orElse(request.getEmail());
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRole(Role.SELLER);
        userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole().name()));
    }

    private Optional<String> resolveEmailFromContext() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getName() != null) {
                return Optional.of(auth.getName());
            }
        } catch (Exception ignored) {}
        return Optional.empty();
    }
}
