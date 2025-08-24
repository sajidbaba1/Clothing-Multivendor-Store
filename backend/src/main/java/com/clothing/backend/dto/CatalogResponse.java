package com.clothing.backend.dto;

import java.util.List;

public class CatalogResponse {
    private List<String> categories;
    private List<String> brands;
    private List<ProductDto> products;

    public CatalogResponse() {}

    public CatalogResponse(List<String> categories, List<String> brands, List<ProductDto> products) {
        this.categories = categories;
        this.brands = brands;
        this.products = products;
    }

    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }

    public List<String> getBrands() { return brands; }
    public void setBrands(List<String> brands) { this.brands = brands; }

    public List<ProductDto> getProducts() { return products; }
    public void setProducts(List<ProductDto> products) { this.products = products; }
}
