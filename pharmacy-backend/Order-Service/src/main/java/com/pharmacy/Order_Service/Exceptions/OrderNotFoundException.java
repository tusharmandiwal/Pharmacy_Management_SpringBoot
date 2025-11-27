package com.pharmacy.Order_Service.Exceptions;

@SuppressWarnings("serial")
public class OrderNotFoundException extends RuntimeException {
	 public OrderNotFoundException(String message) {
		 super(message);
	 }
}
