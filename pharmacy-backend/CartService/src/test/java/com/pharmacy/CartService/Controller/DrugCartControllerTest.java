package com.pharmacy.CartService.Controller;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import com.pharmacy.CartService.Dto.DrugCart;
import com.pharmacy.CartService.Service.DrugCartService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class DrugCartControllerTest {

    private DrugCartController cartController;
    private DrugCartService cartService;

    @BeforeEach
    void setUp() {
        cartService = mock(DrugCartService.class);
        cartController = new DrugCartController(cartService); 
    }

    @Test
    void testGetCartItems() {
        List<DrugCart> cartItems = Arrays.asList(new DrugCart(1L, "Paracetamol", 10.0, 5));
        when(cartService.getCartItems()).thenReturn(ResponseEntity.ok(cartItems));

        ResponseEntity<List<DrugCart>> response = cartController.getCartItems();

        assertNotNull(response);
        assertEquals(1, response.getBody().size());
        assertEquals("Paracetamol", response.getBody().get(0).getName());
    }

    @Test
    void testAddDrugToCart() {
        DrugCart drug = new DrugCart(1L, "Paracetamol", 10.0, 5);
        when(cartService.addDrugToCart(drug)).thenReturn(ResponseEntity.ok(drug));

        ResponseEntity<DrugCart> response = cartController.addDrugToCart(drug);

        assertNotNull(response);
        assertEquals("Paracetamol", response.getBody().getName());
        assertEquals(5, response.getBody().getQuantity());
    }

    @Test
    void testRemoveDrugFromCart_Success() {
        when(cartService.removeDrugFromCart(1L)).thenReturn(ResponseEntity.ok("Drug removed from cart."));

        ResponseEntity<String> response = cartController.removeDrugFromCart(1L);

        assertEquals("Drug removed from cart.", response.getBody());
    }

    @Test
    void testRemoveDrugFromCart_NotFound() {
        when(cartService.removeDrugFromCart(999L)).thenReturn(ResponseEntity.status(404).body("Oops Drug not found in cart"));

        ResponseEntity<String> response = cartController.removeDrugFromCart(999L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode()); 
        assertEquals("Oops Drug not found in cart", response.getBody());
    }

    @Test
    void testClearCart() {
        when(cartService.clearCart()).thenReturn(ResponseEntity.ok("Cart is clean"));

        ResponseEntity<String> response = cartController.clearCart();

        assertEquals("Cart is clean", response.getBody());
    }
}
