package com.pharmacy.Order_Service.modal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "order_drugs")
@JsonPropertyOrder({"name", "quantity", "price"})
public class DrugInfo {

    @EmbeddedId
    @JsonIgnore
    private DrugInfoId id;
    
    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference  
    private Order order;
    
    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;

    public DrugInfo(String name, int quantity, double price, Order order) {
        this.id = new DrugInfoId(order.getId(), name);
        this.quantity = quantity;
        this.price = price;
        this.order = order;
    }

    public DrugInfo() {}

    
    @JsonProperty("name")
    public String getDrugName() {
        return id.getName();
    }

    
    
}

