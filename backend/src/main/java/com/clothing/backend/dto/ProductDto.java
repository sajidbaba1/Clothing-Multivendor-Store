package com.clothing.backend.dto;

public class ProductDto {
    private String id;
    private String title;
    private int price; // in INR
    private String category;
    private String brand;

    public ProductDto() {}

    public ProductDto(String id, String title, int price, String category, String brand) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.brand = brand;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
}
