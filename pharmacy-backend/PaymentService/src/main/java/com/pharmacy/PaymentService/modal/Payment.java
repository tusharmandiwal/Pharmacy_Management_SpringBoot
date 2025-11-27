package com.pharmacy.PaymentService.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private String razorpayOrderId;
    private Double amount;

    @Enumerated(EnumType.STRING) 
    private PaymentStatus status;

    public Payment(Long orderId, String razorpayOrderId, Double amount, PaymentStatus status) {
        this.orderId = orderId;
        this.razorpayOrderId = razorpayOrderId;
        this.amount = amount;
        this.status = status; 
    }
}
