package com.diego.auctionserver.controller;

import com.diego.auctionserver.model.Usuario;
import com.diego.auctionserver.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import com.google.gson.JsonObject;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class LoginController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        Optional<Usuario> usuarioEncontrado = usuarios.stream()
                .filter(u -> u.getUsername().equals(usuario.getUsername()))
                .findFirst();

        if (usuarioEncontrado.isPresent() && usuarioEncontrado.get().getPassword().equals(usuario.getPassword())) {
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("message", "Inicio de sesión exitoso");
            jsonResponse.addProperty("userId", usuarioEncontrado.get().getId());
            return ResponseEntity.ok(jsonResponse.toString());
        } else {
            return ResponseEntity.badRequest().body("Credenciales inválidas");
        }
    }
}
