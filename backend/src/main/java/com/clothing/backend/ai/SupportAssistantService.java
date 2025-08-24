package com.clothing.backend.ai;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SupportAssistantService {
    private final GeminiClient gemini;

    public SupportAssistantService(GeminiClient gemini) {
        this.gemini = gemini;
    }

    public String answer(String message, String base64Image, String mimeType) {
        String system = "You are an e-commerce Support Assistant.\n" +
                "- Help with delivery issues, wrong/bad product, returns and refunds.\n" +
                "- If an image (receipt/defect) is provided, extract order id, product, and visible details succinctly.\n" +
                "- Provide next steps with clear bullet points.";
        List<Map<String, Object>> parts = new ArrayList<>();
        parts.add(Map.of("text", system));
        parts.add(Map.of("text", "User: " + message));
        if (base64Image != null && !base64Image.isBlank() && mimeType != null && !mimeType.isBlank()) {
            Map<String, Object> inline = new HashMap<>();
            inline.put("mimeType", mimeType);
            inline.put("data", base64Image);
            parts.add(Map.of("inlineData", inline));
        }
        return gemini.generateText("gemini-1.5-flash", parts);
    }
}
