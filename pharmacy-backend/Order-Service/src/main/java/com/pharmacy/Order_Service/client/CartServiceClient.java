package com.pharmacy.Order_Service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

import com.pharmacy.Order_Service.dto.Cart;

@FeignClient(name = "CARTSERVICE")
public interface CartServiceClient {

    @GetMapping("/cart")
    ResponseEntity<List<Cart>> getCartItems(); 

    @DeleteMapping("/cart/clear")
    void clearCart();
}
