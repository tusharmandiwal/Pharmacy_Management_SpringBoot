package com.pharmacy.CartService.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.pharmacy.CartService.Dto.DrugCart;

public interface DrugCartService {
	
	ResponseEntity<List<DrugCart>> getCartItems();
    ResponseEntity<DrugCart> addDrugToCart(DrugCart drug);
    ResponseEntity<String> removeDrugFromCart(Long drugId);
    ResponseEntity<String> clearCart();
	ResponseEntity<DrugCart> increaseQuantity(Long drugId);
	ResponseEntity<?> decreaseQuantity(Long drugId);

}