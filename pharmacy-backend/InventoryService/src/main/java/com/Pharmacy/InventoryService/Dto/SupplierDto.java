package com.Pharmacy.InventoryService.Dto;

import lombok.Data;

@Data
public class SupplierDto {
	private Long id;
    private String name;
    private String contactNumber;
    private String email;
    private String address;
}
