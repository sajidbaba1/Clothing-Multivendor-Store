package com.clothing.backend.dto;

public class PaymentOrderRequest {
    private int amount; // in INR paise expected by Razorpay; but this stub accepts INR for simplicity
    private String currency = "INR";

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
