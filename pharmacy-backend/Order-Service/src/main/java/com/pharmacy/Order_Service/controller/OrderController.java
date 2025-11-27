package com.pharmacy.Order_Service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.Order_Service.dto.OrderRequest;
import com.pharmacy.Order_Service.modal.Order;
import com.pharmacy.Order_Service.modal.OrderStatus;
import com.pharmacy.Order_Service.modal.PaymentStatus;
import com.pharmacy.Order_Service.service.OrderService;
import com.pharmacy.Order_Service.util.JwtUtil;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
    private  OrderService orderService;    
	
	@Autowired
	private JwtUtil jwtUtil;


//
//	@PostMapping("/place")
//    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
//        try {
//            Order placedOrder = orderService.createOrder(orderRequest);
//            return ResponseEntity.ok(placedOrder);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body("An error occurred while placing the order.");
//        }
//    }
	
	@PostMapping("/place")
	public ResponseEntity<?> placeOrder(
	        @RequestHeader("Authorization") String authHeader,
	        @RequestParam("paymentMethod") String paymentMethod) {
	    try {
	    	
	    	 System.out.println("Received Authorization Header: " + authHeader);
	        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token.");
	        }

	        
	        String token = authHeader.substring(7);

	       
	        String name = jwtUtil.extractName(token);
	        String email = jwtUtil.extractEmail(token);
	        String phone = jwtUtil.extractPhone(token);

	       OrderRequest orderRequest= new OrderRequest(name, email, phone, paymentMethod);

	        
	        Order placedOrder = orderService.createOrder(orderRequest);
	        return ResponseEntity.ok(placedOrder);

	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body("An error occurred while placing the order.");
	    }
	}

	
    @PutMapping("/update-payment-status/{orderId}/{status}")
    public ResponseEntity<?> updateOrderPaymentStatus(@PathVariable Long orderId, @PathVariable String status) {
        try {
            orderService.updateOrderPaymentStatus(orderId, PaymentStatus.valueOf(status));
            return ResponseEntity.ok("Order payment status updated to " + status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value: " + status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating payment status.");
        }
    }
    



    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveOrder(@PathVariable Long id) {
        try {
            Order approvedOrder = orderService.approveOrderById(id);
            return ResponseEntity.ok(approvedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectOrder(@PathVariable Long id) {
        try {
            Order approvedOrder = orderService.rejectOrderById(id);
            return ResponseEntity.ok(approvedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Order>> getOrders(@PathVariable String email) {
        List<Order> orders = orderService.getOrderByEmail(email);
        return ResponseEntity.ok(orders);
    }
    @GetMapping("/count")
    public ResponseEntity<Double> getOrderCount() {
		double count = orderService.getOrderCount();
		return ResponseEntity.ok(count);
	}
}