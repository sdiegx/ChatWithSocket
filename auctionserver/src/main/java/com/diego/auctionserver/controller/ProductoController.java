package com.diego.auctionserver.controller;

import com.diego.auctionserver.model.Producto;
import com.diego.auctionserver.model.Usuario;
import com.diego.auctionserver.repository.ProductoRepository;
import com.diego.auctionserver.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Producto> getAllUsuarios() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable("id") String id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            return new ResponseEntity<>(producto.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping
    public Producto createProducto (@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable("id") String id, @RequestBody Producto producto) {
        Optional<Producto> productoData = productoRepository.findById(id);
        if (productoData.isPresent()) {
            Producto updatedProducto = productoData.get();
            updatedProducto.setProductname(producto.getProductname());
            updatedProducto.setDescription(producto.getDescription());
            updatedProducto.setPrice(producto.getPrice());
            updatedProducto.setIdUser(producto.getIdUser());
            return new ResponseEntity<>(productoRepository.save(updatedProducto), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProducto(@PathVariable("id") String id) {
        try {
            productoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
