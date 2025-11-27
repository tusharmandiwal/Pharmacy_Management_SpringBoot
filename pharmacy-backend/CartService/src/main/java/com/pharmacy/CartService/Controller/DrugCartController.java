package com.pharmacy.CartService.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.CartService.Dto.DrugCart;
import com.pharmacy.CartService.Service.DrugCartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/cart")
@SessionAttributes("cart")
public class DrugCartController {
	
	
    private DrugCartService cartService;
    
    @Autowired
    public DrugCartController(DrugCartService cartService) {
		super();
		this.cartService = cartService;
	}

	@GetMapping
    public ResponseEntity<List<DrugCart>> getCartItems() {
        return cartService.getCartItems();
    }

    @PostMapping
    public ResponseEntity<DrugCart> addDrugToCart(@RequestBody DrugCart drug) {
        return cartService.addDrugToCart(drug);
    }

    @DeleteMapping("/{drugId}")
    public ResponseEntity<String> removeDrugFromCart(@PathVariable Long drugId) {
        return cartService.removeDrugFromCart(drugId);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {
        return cartService.clearCart();
    }

    @PutMapping("/increase/{drugId}")
    public ResponseEntity<DrugCart> increaseQuantity(@PathVariable Long drugId) {
        return cartService.increaseQuantity(drugId);
    }

    @PutMapping("/decrease/{drugId}")
    public ResponseEntity<?> decreaseQuantity(@PathVariable Long drugId) {
        return cartService.decreaseQuantity(drugId);
    }
}