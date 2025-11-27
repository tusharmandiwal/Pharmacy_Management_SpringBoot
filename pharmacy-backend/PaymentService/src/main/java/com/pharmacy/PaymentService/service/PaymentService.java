package com.pharmacy.PaymentService.service;

public interface PaymentService {


	String generatePaymentLink(Long orderId, Double amount) throws Exception;
	void updatePaymentStatusFromRedirect(String paymentLinkId, String paymentStatus);
}