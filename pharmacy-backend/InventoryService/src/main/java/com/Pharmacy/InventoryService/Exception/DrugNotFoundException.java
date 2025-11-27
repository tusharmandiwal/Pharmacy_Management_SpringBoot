package com.Pharmacy.InventoryService.Exception;

@SuppressWarnings("serial")
public class DrugNotFoundException extends RuntimeException {

	public DrugNotFoundException(String message) {
        super(message);
    }

}
