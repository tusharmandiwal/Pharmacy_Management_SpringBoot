package com.pharmacy.Order_Service.service;

import java.util.List;

import com.pharmacy.Order_Service.dto.OrderRequest;
import com.pharmacy.Order_Service.modal.Order;
import com.pharmacy.Order_Service.modal.PaymentStatus;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest); 
    List<Order> getAllOrders();
    Order approveOrderById(Long orderId); 
    void updateOrderPaymentStatus(Long orderId, PaymentStatus status);
	Order rejectOrderById(Long orderId);

	List<Order> getOrderByEmail(String email);
	double getOrderCount();

}
