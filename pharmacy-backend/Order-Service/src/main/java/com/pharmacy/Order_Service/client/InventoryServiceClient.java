package com.pharmacy.Order_Service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "INVENTORYSERVICE")
public interface InventoryServiceClient {
	
	@PutMapping("/drug/decreaseStock/{name}")
	public ResponseEntity<Void> decreaseDrugStock(@PathVariable String name,@RequestParam int quantity);
}
