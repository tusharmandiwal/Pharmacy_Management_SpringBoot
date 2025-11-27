package com.pharmacy.SupplierService.Controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.pharmacy.SupplierService.Exception.GlobalExceptionHandler;
import com.pharmacy.SupplierService.Exception.SupplierNotFoundException;
import com.pharmacy.SupplierService.controller.SupplierController;
import com.pharmacy.SupplierService.modal.Supplier;
import com.pharmacy.SupplierService.service.SupplierService;
import com.fasterxml.jackson.databind.ObjectMapper;

class SupplierControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SupplierService supplierService;

    @InjectMocks
    private SupplierController supplierController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(supplierController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void testGetAllSuppliers() throws Exception {
        List<Supplier> suppliers = Arrays.asList(new Supplier());
        when(supplierService.getAllSuppliers()).thenReturn(ResponseEntity.ok(suppliers));

        mockMvc.perform(get("/supplier"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetSupplierById_Success() throws Exception {
        Supplier supplier = new Supplier();
        supplier.setId(1L);
        when(supplierService.getSupplierById(1L)).thenReturn(ResponseEntity.ok(supplier));

        mockMvc.perform(get("/supplier/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetSupplierById_NotFound() throws Exception {
        when(supplierService.getSupplierById(1L)).thenThrow(new SupplierNotFoundException("Supplier not found"));

        mockMvc.perform(get("/supplier/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Supplier not found"));
    }

    @Test
    void testAddSupplier() throws Exception {
        Supplier supplier = new Supplier();
        supplier.setName("Supplier A");
        when(supplierService.addSupplier(any(Supplier.class))).thenReturn(ResponseEntity.status(201).body(supplier));

        mockMvc.perform(post("/supplier")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(supplier)))
                .andExpect(status().isCreated());
    }

    @Test
    void testUpdateSupplier() throws Exception {
        Supplier supplier = new Supplier();
        supplier.setName("Updated Supplier");
        when(supplierService.updateSupplier(eq(1L), any(Supplier.class))).thenReturn(ResponseEntity.ok(supplier));

        mockMvc.perform(put("/supplier/1")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(supplier)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteSupplier() throws Exception {
        when(supplierService.deleteSupplier(1L)).thenReturn(ResponseEntity.ok("Supplier kicked out succesfully"));

        mockMvc.perform(delete("/supplier/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Supplier kicked out succesfully"));
    }
}
