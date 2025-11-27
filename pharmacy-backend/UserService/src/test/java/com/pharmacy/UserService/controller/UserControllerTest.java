package com.pharmacy.UserService.controller;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharmacy.UserService.Exceptions.UserAlreadyExistsException;
import com.pharmacy.UserService.modal.Role;
import com.pharmacy.UserService.modal.User;
import com.pharmacy.UserService.service.UserService;

public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testLoginUser_Success() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPhone("1234567890");
        user.setRole(Role.DOCTOR); 

 
        when(userService.getUserByEmail("test@example.com")).thenReturn(user);


        mockMvc.perform(post("/users/login")
                .param("email", "test@example.com")
                .param("password", "password")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.role").value("DOCTOR"));
    }

    @Test
    public void testRegisterUser_Success() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPhone("1234567890");
        user.setPassword("password");

        when(userService.registerUser(any(User.class))).thenReturn(user);


        mockMvc.perform(post("/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.role").value("DOCTOR"));
    }

    @Test
    public void testGetUserByEmail_Success() throws Exception {

        User user = new User();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPhone("1234567890");

        when(userService.getUserByEmail("test@example.com")).thenReturn(user);


        mockMvc.perform(get("/users/{email}", "test@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.name").value("Test User"));
    }

    @Test
    public void testGetAllUsers_Success() throws Exception {

        User user1 = new User();
        user1.setEmail("test1@example.com");
        User user2 = new User();
        user2.setEmail("test2@example.com");

        when(userService.getAllUsers()).thenReturn(List.of(user1, user2));

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].email").value("test1@example.com"))
                .andExpect(jsonPath("$[1].email").value("test2@example.com"));
    }
    @Test
    public void testLoginUser_UserNotFound() throws Exception {

        when(userService.getUserByEmail("nonexistent@example.com")).thenReturn(null);

        mockMvc.perform(post("/users/login")
                .param("email", "nonexistent@example.com")
                .param("password", "password")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testRegisterUser_UserAlreadyExists() throws Exception {

        User user = new User();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPhone("1234567890");
        user.setPassword("password");

        when(userService.registerUser(any(User.class))).thenThrow(new UserAlreadyExistsException("User already exists"));


        mockMvc.perform(post("/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isConflict()); 
    }
}