package com.pharmacy.CartService.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pharmacy.CartService.Dto.DrugCart;
import com.pharmacy.CartService.Exceptions.CartException;
@Service
public class DrugCartServiceImpl  implements DrugCartService{
	
	 private static Logger logger = LoggerFactory.getLogger(DrugCartServiceImpl.class);
	 private final List<DrugCart> cart = new ArrayList<>(); 

	@Override
	public ResponseEntity<List<DrugCart>> getCartItems() {
		logger.info("Fetching cart items....");
		if (cart.isEmpty()) {
            logger.warn("Cart is empty.");
            throw new CartException("Cart is  empty.");
        }
        return ResponseEntity.ok(cart);
	}

	@Override
	public ResponseEntity<DrugCart> addDrugToCart(DrugCart drug) {
		logger.info("Adding drug to cart: {}", drug.getName());
		
		if (drug.getDrugId() == null || drug.getName() == null || drug.getQuantity() <= 0) {
            logger.error("Invalid details provided.");
            throw new CartException("Invalid details. Please provide with valid information.");
        }
        for (DrugCart item : cart) {
            if (item.getDrugId().equals(drug.getDrugId())) {
                item.setQuantity(item.getQuantity() + drug.getQuantity()); 
                return ResponseEntity.ok(item);
            }
        }
        cart.add(drug); 
        return ResponseEntity.ok(drug);
	}

	@Override
	public ResponseEntity<String> removeDrugFromCart(Long drugId) {
		logger.info("Removing drug with Id: {}", drugId);

        Iterator<DrugCart> iterator = cart.iterator();
        while (iterator.hasNext()) {
            DrugCart item = iterator.next();
            if (item.getDrugId().equals(drugId)) {
                iterator.remove();
                return ResponseEntity.ok("Drug removed from cart.");
            }
        }
        logger.warn("Drug with ID {} not found in cart.", drugId);
        throw new CartException("Oops Drug not found in cart.");
	}

	@Override
	public ResponseEntity<String> clearCart() {
		logger.info("Cleaning the cart");
        cart.clear();
        logger.info("Cart cleared successfully.");
        return ResponseEntity.ok("Cart is clean");
	}
	@Override
	public ResponseEntity<DrugCart> increaseQuantity(Long drugId) {
        logger.info("Increasing quantity for drugId: {} by 1", drugId);
        for (DrugCart item : cart) {
            if (item.getDrugId().equals(drugId)) {
                item.setQuantity(item.getQuantity() + 1);
                return ResponseEntity.ok(item);
            }
        }
        logger.warn("Drug with ID {} not found in cart.", drugId);
        throw new CartException("Drug not found in cart.");
    }
	@Override
    public ResponseEntity<?> decreaseQuantity(Long drugId) {
        logger.info("Decreasing quantity for drugId: {} by 1", drugId);
        Iterator<DrugCart> iterator = cart.iterator();
        while (iterator.hasNext()) {
            DrugCart item = iterator.next();
            if (item.getDrugId().equals(drugId)) {
                int newQty = item.getQuantity() - 1;
                if (newQty > 0) {
                    item.setQuantity(newQty);
                    return ResponseEntity.ok(item);
                } else {
                    iterator.remove();
                    return ResponseEntity.ok("Drug removed from cart as quantity reached zero or less.");
                }
            }
        }
        logger.warn("Drug with ID {} not found in cart.", drugId);
        throw new CartException("Drug not found in cart.");
    }

}