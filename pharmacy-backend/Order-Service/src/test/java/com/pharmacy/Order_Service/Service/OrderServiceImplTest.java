//package com.pharmacy.Order_Service.Service;
//
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.never;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.ResponseEntity;
//
//import com.pharmacy.Order_Service.client.CartServiceClient;
//import com.pharmacy.Order_Service.dto.Cart;
//import com.pharmacy.Order_Service.dto.OrderRequest;
//import com.pharmacy.Order_Service.modal.Order;
//import com.pharmacy.Order_Service.modal.OrderStatus;
//import com.pharmacy.Order_Service.repo.OrderRepo;
//import com.pharmacy.Order_Service.service.OrderServiceImpl;
//
//class OrderServiceImplTest {
//
//    @Mock
//    private OrderRepo orderRepo;
//
//    @Mock
//    private CartServiceClient cartServiceClient;
//
//    @InjectMocks
//    private OrderServiceImpl orderService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testCreateOrder_Success() {
//        OrderRequest request = new OrderRequest("Tushar", "tushar@example.com", "1234567890");
//
//        Cart cartItem = new Cart();
//        cartItem.setId(1L);
//        cartItem.setName("Paracetamol");
//        cartItem.setPrice(10.0);
//        cartItem.setQuantity(2);
//
//        List<Cart> cartItems = Arrays.asList(cartItem);
//
//        when(cartServiceClient.getCartItems()).thenReturn(ResponseEntity.ok(cartItems));
//        when(orderRepo.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//        Order savedOrder = orderService.createOrder(request);
//
//        assertNotNull(savedOrder);
//        assertEquals("Tushar", savedOrder.getDoctorName());
//        assertEquals(1, savedOrder.getDrugDetails().size());
//        assertEquals(OrderStatus.PENDING, savedOrder.getStatus());
//
//        verify(cartServiceClient, times(1)).clearCart();
//    }
//
//    @Test
//    void testCreateOrder_EmptyCart_ThrowsException() {
//        OrderRequest request = new OrderRequest("Tushar", "tushar@example.com", "1234567890");
//
//        when(cartServiceClient.getCartItems()).thenReturn(ResponseEntity.ok(List.of()));
//
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> orderService.createOrder(request));
//        assertEquals("Cart is empty. Cannot place order.", exception.getMessage());
//
//        verify(orderRepo, never()).save(any(Order.class));
//        verify(cartServiceClient, never()).clearCart();
//    }
//
//    @Test
//    void testCreateOrder_CartServiceUnavailable_ThrowsException() {
//        OrderRequest request = new OrderRequest("Tushar", "tushar@example.com", "1234567890");
//
//        when(cartServiceClient.getCartItems()).thenThrow(new RuntimeException("Service unavailable"));
//
//        Exception exception = assertThrows(RuntimeException.class, () -> orderService.createOrder(request));
//        assertEquals("Could not fetch cart items, service unavailable.", exception.getMessage());
//
//        verify(orderRepo, never()).save(any(Order.class));
//        verify(cartServiceClient, never()).clearCart();
//    }
//
//    @Test
//    void testGetAllOrders() {
//        Order order1 = new Order();
//        order1.setDoctorName("Tushar");
//
//        Order order2 = new Order();
//        order2.setDoctorName("Tushar");
//
//        List<Order> orders = Arrays.asList(order1, order2);
//        when(orderRepo.findAll()).thenReturn(orders);
//
//        List<Order> fetchedOrders = orderService.getAllOrders();
//
//        assertEquals(2, fetchedOrders.size());
//    }
//
//    @Test
//    void testApproveOrder_Success() {
//        Order order = new Order();
//        order.setId(1L);
//        order.setStatus(OrderStatus.PENDING);
//
//        when(orderRepo.findById(1L)).thenReturn(Optional.of(order));
//        when(orderRepo.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//        Order approvedOrder = orderService.approveOrderById(1L);
//
//        assertNotNull(approvedOrder);
//        assertEquals(OrderStatus.APPROVED, approvedOrder.getStatus());
//    }
//
//    @Test
//    void testApproveOrder_OrderNotFound_ThrowsException() {
//        when(orderRepo.findById(1L)).thenReturn(Optional.empty());
//
//        Exception exception = assertThrows(RuntimeException.class, () -> orderService.approveOrderById(1L));
//        assertEquals("Order not found with ID: 1", exception.getMessage());
//    }
//}
