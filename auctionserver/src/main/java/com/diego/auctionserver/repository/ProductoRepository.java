package com.diego.auctionserver.repository;

import com.diego.auctionserver.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> {
}
