package com.pharmacy.UserService.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.UserService.modal.User;
import com.pharmacy.UserService.security.JwtUtil;
import com.pharmacy.UserService.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	private final JwtUtil jwtUtil;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public UserController(UserService userService, JwtUtil jwtUtil) {
		this.userService = userService;

		this.jwtUtil = jwtUtil;

	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> loginUser(@RequestParam String email, @RequestParam String password) {
		User user = userService.getUserByEmail(email);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}

		if (!passwordEncoder.matches(password, user.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Invalid credentials"));
		}

		String token = jwtUtil.generateToken(user);

		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		response.put("name", user.getName());
		response.put("email", user.getEmail());
		response.put("phone", user.getPhone());
		response.put("role", user.getRole().name());

		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		User registeredUser = userService.registerUser(user);
		return ResponseEntity.ok(registeredUser);
	}

	@GetMapping("/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		User user = userService.getUserByEmail(email);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/phone/{phone}")
	public ResponseEntity<User> getUserByPhone(@PathVariable String phone) {
		User user = userService.getUserByPhone(phone);
		return ResponseEntity.ok(user);
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
	
	@GetMapping("/count")
	public ResponseEntity<Double> getUserCount() {
		Double userCount = userService.getUserCount();
		return ResponseEntity.ok(userCount);
	}
	
	@DeleteMapping("/delete/{email}")
	public ResponseEntity<String> deleteUserByEmail(@PathVariable String email) {
		userService.deleteUserByEmail(email);
		return ResponseEntity.ok("User deleted successfully");
	}
}