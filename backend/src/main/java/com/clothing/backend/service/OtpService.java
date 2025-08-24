package com.clothing.backend.service;

public interface OtpService {
    /**
     * Requests an OTP for the given email and purpose.
     * Returns the generated code (only to be used when dev-peek is enabled).
     */
    String requestOtp(String email, String purpose);

    /**
     * Verifies an OTP and consumes it upon success.
     */
    boolean verifyOtp(String email, String purpose, String code);
}
