package com.pharmacy.Order_Service.modal;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.*;

@SuppressWarnings("serial")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DrugInfoId implements Serializable {
    
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "name")
    private String name;
}
