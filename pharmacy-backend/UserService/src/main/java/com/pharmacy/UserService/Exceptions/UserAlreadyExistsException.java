package com.pharmacy.UserService.Exceptions;

@SuppressWarnings("serial")
public class UserAlreadyExistsException  extends RuntimeException{

	public UserAlreadyExistsException(String message) {
		super(message);
	}
	 
}
