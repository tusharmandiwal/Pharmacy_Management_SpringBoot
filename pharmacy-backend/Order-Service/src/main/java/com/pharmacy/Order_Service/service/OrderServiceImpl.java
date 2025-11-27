package com.pharmacy.Order_Service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pharmacy.Order_Service.client.CartServiceClient;
import com.pharmacy.Order_Service.client.PaymentServiceClient;
import com.pharmacy.Order_Service.dto.Cart;
import com.pharmacy.Order_Service.dto.OrderRequest;
import com.pharmacy.Order_Service.modal.DrugInfo;
import com.pharmacy.Order_Service.modal.Order;
import com.pharmacy.Order_Service.modal.OrderStatus;
import com.pharmacy.Order_Service.modal.PaymentStatus;
import com.pharmacy.Order_Service.repo.OrderRepo;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepo repo;
    private final CartServiceClient cartServiceClient;
    private final PaymentServiceClient paymentServiceClient;



   
    public OrderServiceImpl(OrderRepo repo, CartServiceClient cartServiceClient,
			PaymentServiceClient paymentServiceClient) {
		super();
		this.repo = repo;
		this.cartServiceClient = cartServiceClient;
		this.paymentServiceClient = paymentServiceClient;
	}

	@Override
    public Order createOrder(OrderRequest orderRequest) {
        logger.info("Placing a new order for Doctor: {}", orderRequest.getDoctorName());

        List<Cart> cartItems;
        try {
            ResponseEntity<List<Cart>> response = cartServiceClient.getCartItems();
            cartItems = response.getBody();
        } catch (Exception e) {
            logger.error("Failed to fetch cart items: {}", e.getMessage());
            throw new RuntimeException("Could not fetch cart items, service unavailable.");
        }

        if (cartItems == null || cartItems.isEmpty()) {
            logger.warn("Cart is empty. Order cannot be placed.");
            throw new IllegalArgumentException("Cart is empty. Cannot place order.");
        }

        Order order = new Order();
        order.setDoctorName(orderRequest.getDoctorName());
        order.setDoctorEmail(orderRequest.getDoctorEmail());
        order.setDoctorPhone(orderRequest.getDoctorPhone());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        
        
        List<DrugInfo> drugList = cartItems.stream()
                .map(cart -> new DrugInfo(cart.getName(), cart.getQuantity(), cart.getPrice()*cart.getQuantity(),order))
                .collect(Collectors.toList());
        
        order.setDrugDetails(drugList);
        order.setTotalPrice(cartItems.stream().mapToDouble(cart -> cart.getPrice() * cart.getQuantity()).sum());
        order.setStatus(OrderStatus.PENDING);

        if ("COD".equalsIgnoreCase(orderRequest.getPaymentMethod())) {
            order.setPStatus(PaymentStatus.CASH);
            order.setPaymentLink(null);
            Order savedOrder = repo.save(order);
            try {
                cartServiceClient.clearCart();
            } catch (Exception e) {
                logger.error("Failed to clear cart after placing order: {}", e.getMessage());
            }
            return savedOrder;
        } else if ("ONLINE".equalsIgnoreCase(orderRequest.getPaymentMethod())) {
            order.setPStatus(PaymentStatus.PENDING);
            Order savedOrder = repo.save(order);
            try {
                ResponseEntity<String> paymentLinkResponse =
                        paymentServiceClient.createPayment(savedOrder.getId(), savedOrder.getTotalPrice());
                String paymentLink = paymentLinkResponse.getBody();
                logger.info("Payment link generated for order {}: {}", savedOrder.getId(), paymentLink);
                savedOrder.setPaymentLink(paymentLink);
                repo.save(savedOrder);
            } catch (Exception e) {
                logger.error("Failed to generate payment link: {}", e.getMessage());
            }
            try {
                cartServiceClient.clearCart();
            } catch (Exception e) {
                logger.error("Failed to clear cart after placing order: {}", e.getMessage());
            }
            return savedOrder;
        } else {
            throw new IllegalArgumentException("Invalid payment method. Must be 'COD' or 'ONLINE'.");
        }
    }
	
	
	
	@Override
	public void updateOrderPaymentStatus(Long orderId, PaymentStatus status) {
	    logger.info("Updating payment status for Order ID: {} to {}", orderId, status);

	    Order order = repo.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

	    order.setPStatus(status);
	    repo.save(order);

	    logger.info("Order ID: {} status updated successfully to {}", orderId, status);
	}
	
	



    @Override
    public List<Order> getAllOrders() {
        logger.info("Fetching all orders...");
        return repo.findAll();
    }

    @Override
    public Order approveOrderById(Long orderId) {
        logger.info("Approving order with ID: {}", orderId);
        
        return repo.findById(orderId).map(order -> {
            order.setStatus(OrderStatus.APPROVED);
            return repo.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
    }
    @Override
    public Order rejectOrderById(Long orderId) {
        logger.info("Rejecting order with ID: {}", orderId);
        
        return repo.findById(orderId).map(order -> {
            order.setStatus(OrderStatus.REJECTED);
            return repo.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
    }
    
    @Override
    public List<Order> getOrderByEmail(String email) {
        logger.info("Fetching  orders...");
        return repo.findByDoctorEmail(email);
    }
    @Override
    public double getOrderCount() {
    	logger.info("Fetching order count...");
		List<Order> orders = repo.findAll();
		return orders.stream().count();
    }
}