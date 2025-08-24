package com.clothing.backend.dto;

public class PaymentOrderResponse {
    private String orderId;
    private int amount; // paise or INR depending on front; here echo from request
    private String currency;
    private String keyId; // Razorpay key id to use on frontend

    public PaymentOrderResponse() {}

    public PaymentOrderResponse(String orderId, int amount, String currency, String keyId) {
        this.orderId = orderId;
        this.amount = amount;
        this.currency = currency;
        this.keyId = keyId;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getKeyId() { return keyId; }
    public void setKeyId(String keyId) { this.keyId = keyId; }
}
