package com.pharmacy.UserService.service;

import java.util.List;

import com.pharmacy.UserService.modal.User;

public interface UserService {
	 	User registerUser(User user);
	    User getUserByEmail(String email);
	    User getUserByPhone(String phone);
	    List<User> getAllUsers();
		Double getUserCount();
		void deleteUserByEmail(String email);
		
}