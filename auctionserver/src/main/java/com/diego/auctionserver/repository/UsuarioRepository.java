package com.diego.auctionserver.repository;

import com.diego.auctionserver.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}
