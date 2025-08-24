package com.clothing.backend.controller;

import com.clothing.backend.dto.CatalogResponse;
import com.clothing.backend.dto.ProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    @GetMapping("/products")
    public ResponseEntity<CatalogResponse> listProducts() {
        List<String> categories = List.of("T-Shirts", "Jeans", "Shoes", "Accessories");
        List<String> brands = List.of("Nike", "Adidas", "Zara", "H&M");
        List<ProductDto> products = List.of(
                new ProductDto("1", "Cotton Tee", 499, "T-Shirts", "Zara"),
                new ProductDto("2", "Slim Jeans", 1799, "Jeans", "H&M"),
                new ProductDto("3", "Running Shoes", 2499, "Shoes", "Nike"),
                new ProductDto("4", "Cap", 299, "Accessories", "Adidas")
        );
        CatalogResponse resp = new CatalogResponse(categories, brands, products);
        return ResponseEntity.ok(resp);
    }
}
