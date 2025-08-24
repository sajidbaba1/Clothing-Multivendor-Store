package com.clothing.backend.dto;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String email;
    private String role;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String email, String role) {
        this.accessToken = accessToken;
        this.email = email;
        this.role = role;
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
