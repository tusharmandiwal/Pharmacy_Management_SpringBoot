package com.pharmacy.Order_Service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "PAYMENT-SERVICE", path = "/payment")
public interface PaymentServiceClient {

    @PostMapping("/create/{orderId}/{amount}")
    ResponseEntity<String> createPayment(@PathVariable Long orderId, @PathVariable Double amount);
	


    @PostMapping("/update")
    ResponseEntity<String> updatePaymentStatus(@RequestParam String razorpayOrderId,
                                               @RequestParam String paymentId,
                                               @RequestParam String status);
}
