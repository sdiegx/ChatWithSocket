package com.diego.auctionserver.repository;

import com.diego.auctionserver.model.Auction;
import com.diego.auctionserver.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuctionRepository extends MongoRepository<Auction, String> {
}
