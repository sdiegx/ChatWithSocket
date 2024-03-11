package com.diego.auctionsocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

public class WebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);
    private final List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        logger.info("Nueva conexión establecida. Sesiones activas: {}", sessions.size());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Se llama cuando se recibe un mensaje de texto desde un cliente WebSocket
        String payload = message.getPayload();
        logger.info("Mensaje recibido del cliente {}: {}", session.getId(), payload);
        broadcast(payload);
        // Aquí puedes implementar la lógica para manejar los mensajes de subasta
    }

    private void broadcast(String message) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                logger.error("Error al enviar mensaje a la sesión {}", session.getId(), e);
            }
        }
        logger.info("Mensaje enviado a todos los clientes: {}", message);
    }
}

