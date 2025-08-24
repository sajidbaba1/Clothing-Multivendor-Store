package com.clothing.backend.controller;

import com.clothing.backend.dto.PaymentOrderRequest;
import com.clothing.backend.dto.PaymentOrderResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${app.razorpay.key-id:}")
    private String razorpayKeyId;

    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createOrder(@RequestBody PaymentOrderRequest request) {
        // In production: call Razorpay Orders API from server then return orderId and keyId
        String fakeOrderId = "order_" + UUID.randomUUID();
        int amount = request.getAmount();
        String currency = request.getCurrency() == null ? "INR" : request.getCurrency();
        PaymentOrderResponse resp = new PaymentOrderResponse(fakeOrderId, amount, currency, razorpayKeyId);
        return ResponseEntity.ok(resp);
    }
}
