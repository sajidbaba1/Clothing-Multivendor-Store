package com.clothing.backend.ai;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountAssistantService {
    private final GeminiClient gemini;

    public AccountAssistantService(GeminiClient gemini) {
        this.gemini = gemini;
    }

    public String answer(String message) {
        String system = "You are an e-commerce Account Assistant.\n" +
                "- Provide concise, helpful answers about account, orders (including cancelled), and cart.\n" +
                "- If specific data is not provided in the prompt, respond with general steps the user can take in the app to find the information.\n" +
                "- Keep responses short and structured with bullet points when appropriate.";
        List<Map<String, Object>> parts = new ArrayList<>();
        parts.add(Map.of("text", system));
        parts.add(Map.of("text", "User: " + message));
        return gemini.generateText("gemini-1.5-flash", parts);
    }
}
