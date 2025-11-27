package com.pharmacy.Order_Service.dto;

import lombok.Data;

@Data
public class Cart {

	private Long id;
    private String name;
    private Double price;
    private int quantity;
}
