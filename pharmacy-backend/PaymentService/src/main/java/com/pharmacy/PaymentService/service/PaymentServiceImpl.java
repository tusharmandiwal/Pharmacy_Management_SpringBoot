package com.pharmacy.PaymentService.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.pharmacy.PaymentService.client.OrderServiceClient;
import com.pharmacy.PaymentService.modal.Payment;
import com.pharmacy.PaymentService.modal.PaymentStatus;
import com.pharmacy.PaymentService.repo.PaymentRepository;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentServiceImpl implements PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);

    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;
    private final OrderServiceClient orderServiceClient;
    public PaymentServiceImpl(PaymentRepository paymentRepository, OrderServiceClient orderServiceClient) throws RazorpayException {
        this.paymentRepository = paymentRepository;
        this.razorpayClient = new RazorpayClient("rzp_test_3ZR57Oi39FzlGj", "HJH1Ad916jo0RmH8YpNcbm4q");
        this.orderServiceClient = orderServiceClient;
    }


    @Override
    public String generatePaymentLink(Long orderId, Double amount) throws Exception {
        logger.info("Generating payment link for Order ID: {}", orderId);


        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", (int)(amount * 100)); 
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", "Tushar Mandiwal");
        customer.put("email", "tusharmandiwal@gmail.com");

        paymentLinkRequest.put("customer", customer);

        paymentLinkRequest.put("callback_url", "http://localhost:8082/payment/razorpay-redirect");
        paymentLinkRequest.put("callback_method", "get");
        paymentLinkRequest.put("description", "Order Payment for ID: " + orderId);

        PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

        Payment payment = new Payment(orderId, paymentLink.get("id"), amount, PaymentStatus.PENDING);
        paymentRepository.save(payment);

        String paymentUrl = paymentLink.get("short_url").toString();
        logger.info("Payment link generated for Order ID {}: {}", orderId, paymentUrl);

        return paymentUrl;
    }

    


    @Override
    public void updatePaymentStatusFromRedirect(String paymentLinkId, String paymentStatus) {
        Payment payment = paymentRepository.findByRazorpayOrderId(paymentLinkId);
        if (payment == null) {
            logger.error("Payment record not found for Razorpay Payment Link ID: {}", paymentLinkId);
            return;
        }
        if ("paid".equalsIgnoreCase(paymentStatus)) {
            payment.setStatus(PaymentStatus.SUCCESSFUL);
            logger.info("Payment successful for Order ID: {} (via redirect)", payment.getOrderId());
            orderServiceClient.updateOrderPaymentStatus(payment.getOrderId(), "SUCCESSFULL");
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            logger.warn("Payment failed for Order ID: {} (via redirect)", payment.getOrderId());
            orderServiceClient.updateOrderPaymentStatus(payment.getOrderId(), "FAILED");
        }
        paymentRepository.save(payment);
    }
}