package com.pharmacy.CartService.Service;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.pharmacy.CartService.Dto.DrugCart;
import com.pharmacy.CartService.Exceptions.CartException;

class DrugCartServiceImplTest {

    private DrugCartServiceImpl cartService;

    @BeforeEach
    void setUp() {
        cartService = new DrugCartServiceImpl();
    }

    @Test
    void testGetCartItems_EmptyCart_ShouldThrowException() {
        CartException exception = assertThrows(CartException.class, () -> {
            cartService.getCartItems();
        });

        assertEquals("Cart is  empty.", exception.getMessage());
    }

    @Test
    void testAddDrugToCart_NewDrug_Success() {
        DrugCart drug = new DrugCart();
        drug.setDrugId(1L);
        drug.setName("Paracetamol");
        drug.setPrice(10.0);
        drug.setQuantity(2);

        ResponseEntity<DrugCart> response = cartService.addDrugToCart(drug);
        assertNotNull(response);
        assertEquals("Paracetamol", response.getBody().getName());
        assertEquals(2, response.getBody().getQuantity());
    }

    @Test
    void testAddDrugToCart_ExistingDrug_ShouldUpdateQuantity() {
        DrugCart drug1 = new DrugCart();
        drug1.setDrugId(1L);
        drug1.setName("Paracetamol");
        drug1.setPrice(10.0);
        drug1.setQuantity(2);

        cartService.addDrugToCart(drug1);

        DrugCart drug2 = new DrugCart();
        drug2.setDrugId(1L);
        drug2.setName("Paracetamol");
        drug2.setPrice(10.0);
        drug2.setQuantity(3);

        ResponseEntity<DrugCart> response = cartService.addDrugToCart(drug2);

        assertNotNull(response);
        assertEquals(5, response.getBody().getQuantity()); // Quantity should be updated
    }

    @Test
    void testAddDrugToCart_InvalidDetails_ShouldThrowException() {
        DrugCart drug = new DrugCart();
        drug.setDrugId(null);
        drug.setName(null);
        drug.setQuantity(-1);

        CartException exception = assertThrows(CartException.class, () -> {
            cartService.addDrugToCart(drug);
        });

        assertEquals("Invalid details. Please provide with valid information.", exception.getMessage());
    }

    @Test
    void testRemoveDrugFromCart_Success() {
        DrugCart drug = new DrugCart();
        drug.setDrugId(1L);
        drug.setName("Paracetamol");
        drug.setPrice(10.0);
        drug.setQuantity(2);

        cartService.addDrugToCart(drug);
        ResponseEntity<String> response = cartService.removeDrugFromCart(1L);

        assertEquals("Drug removed from cart.", response.getBody());
    }

    @Test
    void testRemoveDrugFromCart_NotFound_ShouldThrowException() {
        CartException exception = assertThrows(CartException.class, () -> {
            cartService.removeDrugFromCart(999L);
        });

        assertEquals("Oops Drug not found in cart.", exception.getMessage());
    }

    @Test
    void testClearCart() {
        DrugCart drug = new DrugCart();
        drug.setDrugId(1L);
        drug.setName("Paracetamol");
        drug.setPrice(10.0);
        drug.setQuantity(2);

        cartService.addDrugToCart(drug);
        ResponseEntity<String> response = cartService.clearCart();

        assertEquals("Cart is clean", response.getBody());

        CartException exception = assertThrows(CartException.class, () -> {
            cartService.getCartItems();
        });

        assertEquals("Cart is  empty.", exception.getMessage());
    }
}
