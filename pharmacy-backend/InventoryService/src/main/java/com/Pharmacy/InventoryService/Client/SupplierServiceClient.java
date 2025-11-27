package com.Pharmacy.InventoryService.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.Pharmacy.InventoryService.Dto.SupplierDto;

@FeignClient(name="SUPPLIER-SERVICE")
public interface SupplierServiceClient {
	
	@GetMapping("/supplier/{id}")
    SupplierDto getSupplierById(@PathVariable Long id); 
}
