package com.pharmacy.UserService.modal;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@JsonPropertyOrder({"id", "name", "email", "phone", "role"})
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	@Email
	private String email;
	
	@Column(nullable = false, unique = true)
	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
	private String phone;


	@Column(nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role=Role.DOCTOR;

	public User(String name, @Email String email,String phone,String password) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}
	


	
}
