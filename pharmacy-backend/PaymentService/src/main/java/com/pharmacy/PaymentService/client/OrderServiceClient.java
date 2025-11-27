package com.pharmacy.PaymentService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "ORDER-SERVICE")
public interface OrderServiceClient {
    
    @PutMapping("/orders/update-payment-status/{orderId}/{status}")
    void updateOrderPaymentStatus(@PathVariable Long orderId, @PathVariable String status);
}