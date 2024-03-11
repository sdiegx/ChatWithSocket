package com.diego.auctionserver.controller;

import com.diego.auctionserver.model.Auction;
import com.diego.auctionserver.model.Producto;
import com.diego.auctionserver.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subastas")
@CrossOrigin(origins = "http://localhost:5173/")
public class AuctionController {
    @Autowired
    private AuctionRepository auctionRepository;

    @GetMapping
    public List<Auction> getAllUsuarios() {
        return auctionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> getAuctionById(@PathVariable("id") String id) {
        Optional<Auction> auction = auctionRepository.findById(id);
        if (auction.isPresent()) {
            return new ResponseEntity<>(auction.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping
    public Auction createAuction (@RequestBody Auction auction) {
        return auctionRepository.save(auction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auction> updateAuction(@PathVariable("id") String id, @RequestBody Auction auction) {
        Optional<Auction> auctionData = auctionRepository.findById(id);
        if (auctionData.isPresent()) {
            Auction updatedAuction = auctionData.get();
            updatedAuction.setAuctionName(auction.getAuctionName());
            updatedAuction.setIdProduct(auction.getIdProduct());
            updatedAuction.setIdUser(auction.getIdUser());
            updatedAuction.setSaleprice(auction.getSaleprice());
            return new ResponseEntity<>(auctionRepository.save(updatedAuction), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAuction(@PathVariable("id") String id) {
        try {
            auctionRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
