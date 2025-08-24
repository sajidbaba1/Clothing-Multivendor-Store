package com.clothing.backend.dto;

public class RequestOtpResponse {
    private String message;
    private String devCode; // only when dev-peek-enabled=true

    public RequestOtpResponse() {}

    public RequestOtpResponse(String message) {
        this.message = message;
    }

    public RequestOtpResponse(String message, String devCode) {
        this.message = message;
        this.devCode = devCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDevCode() {
        return devCode;
    }

    public void setDevCode(String devCode) {
        this.devCode = devCode;
    }
}
