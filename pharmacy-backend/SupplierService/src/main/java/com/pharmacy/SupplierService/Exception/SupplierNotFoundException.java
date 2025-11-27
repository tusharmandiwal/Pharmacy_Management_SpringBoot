package com.pharmacy.SupplierService.Exception;

@SuppressWarnings("serial")
public class SupplierNotFoundException  extends RuntimeException{
	 public SupplierNotFoundException(String message) {
		 super(message);
	 }
}
