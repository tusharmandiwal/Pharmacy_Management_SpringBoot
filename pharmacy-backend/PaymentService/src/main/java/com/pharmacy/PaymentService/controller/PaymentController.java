package com.pharmacy.PaymentService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.PaymentService.service.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create/{orderId}/{amount}")
    public ResponseEntity<?> createPayment(@PathVariable Long orderId, @PathVariable Double amount) {
        try {
            String paymentLink = paymentService.generatePaymentLink(orderId, amount);
            return ResponseEntity.ok(paymentLink);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error generating payment link.");
        }
    }



    @GetMapping("/razorpay-redirect")
    public ResponseEntity<?> handleRedirect(
            @RequestParam(required = false) String razorpay_payment_id,
            @RequestParam(required = false) String razorpay_payment_link_id,
            @RequestParam(required = false) String razorpay_payment_link_status,
            @RequestParam(required = false) String razorpay_signature) {
        paymentService.updatePaymentStatusFromRedirect(razorpay_payment_link_id, razorpay_payment_link_status);

        String redirectUrl = "http://localhost:5173/userhistory?message=Thank%20you%20for%20Placing%20your%20order";
        return ResponseEntity.status(302).header("Location", redirectUrl).build();
    }
}