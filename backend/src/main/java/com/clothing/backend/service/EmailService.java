package com.clothing.backend.service;

public interface EmailService {
    void send(String to, String subject, String body);
}
