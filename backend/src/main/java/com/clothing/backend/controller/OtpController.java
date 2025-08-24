package com.clothing.backend.controller;

import com.clothing.backend.dto.RequestOtpRequest;
import com.clothing.backend.dto.RequestOtpResponse;
import com.clothing.backend.dto.VerifyOtpRequest;
import com.clothing.backend.dto.VerifyOtpResponse;
import com.clothing.backend.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class OtpController {

    private final OtpService otpService;

    @Value("${app.otp.dev-peek-enabled:false}")
    private boolean devPeekEnabled;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/request-otp")
    public ResponseEntity<RequestOtpResponse> requestOtp(@Valid @RequestBody RequestOtpRequest request) {
        String devCode = otpService.requestOtp(request.getEmail(), request.getPurpose());
        RequestOtpResponse resp = devPeekEnabled
                ? new RequestOtpResponse("OTP sent if email is valid.", devCode)
                : new RequestOtpResponse("OTP sent if email is valid.");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<VerifyOtpResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        boolean ok = otpService.verifyOtp(request.getEmail(), request.getPurpose(), request.getCode());
        if (ok) {
            return ResponseEntity.ok(new VerifyOtpResponse(true, "OTP verified"));
        }
        return ResponseEntity.badRequest().body(new VerifyOtpResponse(false, "Invalid or expired OTP"));
    }
}
