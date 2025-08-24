package com.clothing.backend.ai.dto;

import java.util.List;

public class GeminiMessage {
    public static class AccountChatRequest {
        public String message;
    }
    public static class SupportChatResponse {
        public String reply;
        public Extracted extracted;
        public static class Extracted {
            public String orderId;
            public String productName;
            public String issueType;
        }
    }
    public static class ChatResponse {
        public String reply;
    }
}
