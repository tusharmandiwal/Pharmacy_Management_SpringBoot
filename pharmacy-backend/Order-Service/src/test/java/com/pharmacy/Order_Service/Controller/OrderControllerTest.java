//package com.pharmacy.Order_Service.Controller;
//
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.Arrays;
//import java.util.List;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.pharmacy.Order_Service.controller.OrderController;
//import com.pharmacy.Order_Service.dto.OrderRequest;
//import com.pharmacy.Order_Service.modal.Order;
//import com.pharmacy.Order_Service.modal.OrderStatus;
//import com.pharmacy.Order_Service.service.OrderService;
//
//class OrderControllerTest {
//
//    private MockMvc mockMvc;
//
//    @Mock
//    private OrderService orderService;
//
//    @InjectMocks
//    private OrderController orderController;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//        mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
//    }
//
//    @Test
//    void testPlaceOrder_Success() throws Exception {
//        OrderRequest request = new OrderRequest("Tushar", "tushar@example.com", "1234567890");
//        Order order = new Order();
//        order.setDoctorName(request.getDoctorName());
//        order.setDoctorEmail(request.getDoctorEmail());
//        order.setDoctorPhone(request.getDoctorPhone());
//        order.setStatus(OrderStatus.PENDING);
//
//        when(orderService.createOrder(any(OrderRequest.class))).thenReturn(order);
//
//        mockMvc.perform(post("/orders/place")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(new ObjectMapper().writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.doctorName").value("Tushar"))
//                .andExpect(jsonPath("$.status").value("PENDING"));
//    }
//
//    @Test
//    void testPlaceOrder_EmptyCart() throws Exception {
//        OrderRequest request = new OrderRequest("Tushar", "tushar@example.com", "1234567890");
//
//        when(orderService.createOrder(any(OrderRequest.class))).thenThrow(new IllegalArgumentException("Cart is empty. Cannot place order."));
//
//        mockMvc.perform(post("/orders/place")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(new ObjectMapper().writeValueAsString(request)))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().string("Cart is empty. Cannot place order."));
//    }
//
//    @Test
//    void testGetAllOrders() throws Exception {
//        Order order1 = new Order();
//        order1.setDoctorName("Tushar");
//
//        Order order2 = new Order();
//        order2.setDoctorName("Tushar");
//
//        List<Order> orders = Arrays.asList(order1, order2);
//        when(orderService.getAllOrders()).thenReturn(orders);
//
//        mockMvc.perform(get("/orders"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(2));
//    }
//
//    @Test
//    void testApproveOrder_Success() throws Exception {
//        Order order = new Order();
//        order.setId(1L);
//        order.setStatus(OrderStatus.APPROVED);
//
//        when(orderService.approveOrderById(1L)).thenReturn(order);
//
//        mockMvc.perform(put("/orders/approve/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.status").value("APPROVED"));
//    }
//
//    @Test
//    void testApproveOrder_NotFound() throws Exception {
//        when(orderService.approveOrderById(1L)).thenThrow(new RuntimeException("Order not found"));
//
//        mockMvc.perform(put("/orders/approve/1"))
//                .andExpect(status().isNotFound());
//    }
//}
//
