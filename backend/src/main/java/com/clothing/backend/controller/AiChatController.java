package com.clothing.backend.controller;

import com.clothing.backend.ai.AccountAssistantService;
import com.clothing.backend.ai.SupportAssistantService;
import com.clothing.backend.ai.dto.GeminiMessage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/api/ai")
public class AiChatController {

    private final AccountAssistantService accountService;
    private final SupportAssistantService supportService;

    public AiChatController(AccountAssistantService accountService, SupportAssistantService supportService) {
        this.accountService = accountService;
        this.supportService = supportService;
    }

    @PostMapping("/account/chat")
    public GeminiMessage.ChatResponse accountChat(@RequestBody GeminiMessage.AccountChatRequest body) {
        GeminiMessage.ChatResponse resp = new GeminiMessage.ChatResponse();
        String msg = body != null ? body.message : "";
        resp.reply = accountService.answer(msg);
        return resp;
    }

    @PostMapping(value = "/support/chat", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public GeminiMessage.ChatResponse supportChat(
            @RequestPart("message") String message,
            @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        String base64 = null;
        String mime = null;
        if (image != null && !image.isEmpty()) {
            base64 = Base64.getEncoder().encodeToString(image.getBytes());
            mime = image.getContentType();
        }
        GeminiMessage.ChatResponse resp = new GeminiMessage.ChatResponse();
        resp.reply = supportService.answer(message, base64, mime);
        return resp;
    }
}
