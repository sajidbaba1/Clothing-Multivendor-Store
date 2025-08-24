package com.clothing.backend.service.impl;

import com.clothing.backend.service.EmailService;
import com.clothing.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final EmailService emailService;

    @Value("${app.otp.length:6}")
    private int otpLength;

    @Value("${app.otp.expiry-seconds:300}")
    private long expirySeconds;

    @Value("${app.otp.rate-limit-per-minute:3}")
    private int rateLimitPerMinute;

    @Value("${app.otp.dev-peek-enabled:false}")
    private boolean devPeekEnabled;

    private static final class Key {
        final String email;
        final String purpose;
        Key(String email, String purpose) {
            this.email = email.toLowerCase();
            this.purpose = purpose.toUpperCase();
        }
        @Override public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Key)) return false;
            Key key = (Key) o;
            return Objects.equals(email, key.email) && Objects.equals(purpose, key.purpose);
        }
        @Override public int hashCode() {
            return Objects.hash(email, purpose);
        }
    }

    private static final class OtpEntry {
        final String code;
        final Instant expiresAt;
        OtpEntry(String code, Instant expiresAt) {
            this.code = code;
            this.expiresAt = expiresAt;
        }
    }

    private final Map<Key, OtpEntry> store = new ConcurrentHashMap<>();
    private final Map<String, Deque<Long>> rateMap = new ConcurrentHashMap<>(); // per email

    public OtpServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public String requestOtp(String email, String purpose) {
        enforceRateLimit(email);
        String code = generateCode(otpLength);
        Instant expiresAt = Instant.now().plusSeconds(expirySeconds);
        store.put(new Key(email, purpose), new OtpEntry(code, expiresAt));
        // Send email
        String subject = "Your OTP Code";
        String body = "Your OTP code is: " + code + "\nIt will expire in " + (expirySeconds / 60) + " minutes.";
        try {
            emailService.send(email, subject, body);
        } catch (Exception ex) {
            // Do not fail the request because of email failure; still return dev code if enabled
        }
        return devPeekEnabled ? code : null;
    }

    @Override
    public boolean verifyOtp(String email, String purpose, String code) {
        Key key = new Key(email, purpose);
        OtpEntry entry = store.get(key);
        if (entry == null) return false;
        if (Instant.now().isAfter(entry.expiresAt)) {
            store.remove(key);
            return false;
        }
        boolean ok = entry.code.equals(code);
        if (ok) {
            store.remove(key); // consume on success
        }
        return ok;
    }

    private void enforceRateLimit(String email) {
        long now = System.currentTimeMillis();
        Deque<Long> dq = rateMap.computeIfAbsent(email.toLowerCase(), k -> new ArrayDeque<>());
        // purge older than 60s
        while (!dq.isEmpty() && now - dq.peekFirst() > 60_000) {
            dq.pollFirst();
        }
        if (dq.size() >= rateLimitPerMinute) {
            throw new IllegalStateException("Too many OTP requests. Please try again later.");
        }
        dq.addLast(now);
    }

    private static String generateCode(int len) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(RANDOM.nextInt(10)); // digits 0-9
        }
        return sb.toString();
    }
}
