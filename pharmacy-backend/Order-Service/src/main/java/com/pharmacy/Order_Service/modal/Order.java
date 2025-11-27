package com.pharmacy.Order_Service.modal;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "order_table")
public class Order {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	private String doctorName;
    private String doctorEmail;
    private String doctorPhone;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DrugInfo> drugDetails;
    private Double totalPrice;
    
    @Column(nullable = false)
    private LocalDate orderDate;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @Enumerated(EnumType.STRING)
    private PaymentStatus pStatus;
    
    @Column(name = "payment_link")
    private String paymentLink;
    
    private String paymentMethod; // "COD" or "ONLINE"
    
    @PrePersist
    public void prePersist() {
        this.orderDate = LocalDate.now();
        this.status=OrderStatus.PENDING;
    }
}