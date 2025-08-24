package com.clothing.backend.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Component
public class GeminiClient {
    private final RestTemplate restTemplate = new RestTemplate();

    private final String propertyKey;

    public GeminiClient(@Value("${app.gemini.api-key:}") String propertyKey) {
        this.propertyKey = propertyKey;
    }

    private String resolveApiKey() {
        String env = System.getenv("APP_GEMINI_API_KEY");
        if (StringUtils.hasText(env)) return env;
        return propertyKey;
    }

    public String generateText(String model, List<Map<String, Object>> parts) {
        String apiKey = resolveApiKey();
        if (!StringUtils.hasText(apiKey)) {
            return "Gemini API key is not configured. Set APP_GEMINI_API_KEY or app.gemini.api-key.";
        }
        String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s", model, apiKey);

        Map<String, Object> body = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        content.put("role", "user");
        content.put("parts", parts);
        body.put("contents", Collections.singletonList(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            Map<?, ?> response = resp.getBody();
            if (response == null) return "No response from Gemini.";
            // Extract first candidate text
            Object candidates = response.get("candidates");
            if (candidates instanceof List<?> list && !list.isEmpty()) {
                Object first = list.get(0);
                if (first instanceof Map<?, ?> c) {
                    Object contentObj = c.get("content");
                    if (contentObj instanceof Map<?, ?> contentMap) {
                        Object partsObj = contentMap.get("parts");
                        if (partsObj instanceof List<?> partsList && !partsList.isEmpty()) {
                            Object part0 = partsList.get(0);
                            if (part0 instanceof Map<?, ?> p) {
                                Object text = p.get("text");
                                if (text != null) return String.valueOf(text);
                            }
                        }
                    }
                }
            }
            return "Unable to parse Gemini response.";
        } catch (Exception ex) {
            return "Gemini request failed: " + ex.getMessage();
        }
    }
}
