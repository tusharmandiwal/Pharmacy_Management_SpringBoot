package com.pharmacy.UserService.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmacy.UserService.modal.User;

public interface UserRepo extends JpaRepository<User, Long> {
	User findByEmail(String email);
	User findByPhone(String phone); 
}	
