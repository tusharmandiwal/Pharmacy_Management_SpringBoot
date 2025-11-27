package com.pharmacy.UserService.Service;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.pharmacy.UserService.Exceptions.UserAlreadyExistsException;
import com.pharmacy.UserService.Exceptions.UserNotFoundException;
import com.pharmacy.UserService.Repo.UserRepo;
import com.pharmacy.UserService.modal.Role;
import com.pharmacy.UserService.modal.User;
import com.pharmacy.UserService.service.UserServiceImpl;

public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepo userRepo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterUser_Success() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userRepo.findByEmail("test@example.com")).thenReturn(null);
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setRole(Role.DOCTOR); 
            return savedUser;
        });

        // Act
        User registeredUser = userService.registerUser(user);

        // Assert
        assertEquals("test@example.com", registeredUser.getEmail());
        assertEquals("DOCTOR", registeredUser.getRole()); // Verify that the role is set to DOCTOR
    }

    @Test
    public void testRegisterUser_UserAlreadyExists() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepo.findByEmail("test@example.com")).thenReturn(user);

        // Act & Assert
        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.registerUser(user);
        });
    }

    @Test
    public void testGetUserByEmail_Success() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepo.findByEmail("test@example.com")).thenReturn(user);

        // Act
        User foundUser = userService.getUserByEmail("test@example.com");

        // Assert
        assertEquals("test@example.com", foundUser.getEmail());
    }

    @Test
    public void testGetUserByEmail_NotFound() {
        // Arrange
        when(userRepo.findByEmail("test@example.com")).thenReturn(null);

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserByEmail("test@example.com");
        });
    }

    @Test
    public void testGetAllUsers_Success() {
        // Arrange
        User user1 = new User();
        user1.setEmail("test1@example.com");
        User user2 = new User();
        user2.setEmail("test2@example.com");

        when(userRepo.findAll()).thenReturn(Arrays.asList(user1, user2));

        // Act
        List<User> users = userService.getAllUsers();

        // Assert
        assertEquals(2, users.size());
    }

    @Test
    public void testGetAllUsers_NotFound() {
        // Arrange
        when(userRepo.findAll()).thenReturn(Arrays.asList());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> {
            userService.getAllUsers();
        });
    }
}

