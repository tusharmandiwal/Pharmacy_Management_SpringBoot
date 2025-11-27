package com.pharmacy.Order_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderRequest {
	private String doctorName;
    private String doctorEmail;
    private String doctorPhone;
    private String paymentMethod; // "COD" or "ONLINE"
}