package com.pharmacy.UserService.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pharmacy.UserService.Exceptions.UserAlreadyExistsException;
import com.pharmacy.UserService.Exceptions.UserNotFoundException;
import com.pharmacy.UserService.Repo.UserRepo;
import com.pharmacy.UserService.modal.User;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	private UserRepo repo;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepo repo ,PasswordEncoder passwordEncoder) {
		super();
		this.repo = repo;
		this.passwordEncoder = passwordEncoder ;
	}

	@Override
	public User registerUser(User user) {
		if (repo.findByEmail(user.getEmail()) != null) {
			throw new UserAlreadyExistsException("User with email " + user.getEmail() + " already exists.");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = repo.save(user);
		logger.info("New user registered: {}", savedUser.getEmail());
		return savedUser;
	}

	@Override
	public User getUserByEmail(String email) {
		User user = repo.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("User with email " + email + " not found.");
		}
		return user;
	}

	@Override
	public User getUserByPhone(String phone) {
		User user = repo.findByPhone(phone);
        if (user == null) {
            throw new UserNotFoundException("User with phone " + phone + " not found.");
        }
        return user;
	}

	@Override
	public List<User> getAllUsers() {
		List<User> users = repo.findAll();
        if (users.isEmpty()) {
            throw new UserNotFoundException("No users found.");
        }
        return users;
	}
	
	@Override
	public Double getUserCount() {
		double userCount = getAllUsers().size();
		return userCount;
	}

	@Override
	public void deleteUserByEmail(String email) {
        User user = repo.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User with email " + email + " not found.");
        }
        repo.delete(user);
        logger.info("User deleted: {}", email);
    }
	
}