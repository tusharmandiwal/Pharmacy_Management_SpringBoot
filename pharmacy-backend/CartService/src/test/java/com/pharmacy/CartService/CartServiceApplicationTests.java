package com.pharmacy.CartService;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pharmacy.CartService.Controller.DrugCartController;

@SpringBootTest
class CartServiceApplicationTests {

	 	@Autowired
	    private DrugCartController cartController;

	    @Test
	    void contextLoads() {
	        assertThat(cartController).isNotNull(); // Ensures the controller is loaded
	    }

}
