package com.pharmacy.PaymentService.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmacy.PaymentService.modal.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	  Payment findByRazorpayOrderId(String razorpayOrderId);
}