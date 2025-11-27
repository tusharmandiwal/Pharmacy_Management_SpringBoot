package com.pharmacy.CartService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrugCart {

		private Long drugId;
	    private String name;
	    private double price;
	    private int quantity;
}
