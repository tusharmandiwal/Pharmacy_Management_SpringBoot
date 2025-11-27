package com.pharmacy.SupplierService.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.pharmacy.SupplierService.Exception.SupplierNotFoundException;
import com.pharmacy.SupplierService.Repo.SupplierRepo;
import com.pharmacy.SupplierService.modal.Supplier;
import com.pharmacy.SupplierService.service.SupplierServiceImpl;

@ExtendWith(MockitoExtension.class)
class SupplierServiceImplTest {

    @Mock
    private SupplierRepo supplierRepo;

    @InjectMocks
    private SupplierServiceImpl supplierService;

    private Supplier supplier1, supplier2;

    @BeforeEach
    void setUp() {
        supplier1 = new Supplier();
        supplier1.setId(1L);
        supplier1.setName("Supplier One");
        supplier1.setContactNumber("1234567890");
        supplier1.setEmail("supplier1@example.com");
        supplier1.setAddress("Address One");

        supplier2 = new Supplier();
        supplier2.setId(2L);
        supplier2.setName("Supplier Two");
        supplier2.setContactNumber("0987654321");
        supplier2.setEmail("supplier2@example.com");
        supplier2.setAddress("Address Two");
    }

    @Test
    void testGetAllSuppliers() {
        when(supplierRepo.findAll()).thenReturn(Arrays.asList(supplier1, supplier2));

        ResponseEntity<List<Supplier>> response = supplierService.getAllSuppliers();
        assertNotNull(response);
        assertEquals(2, response.getBody().size());
    }

    @Test
    void testGetSupplierById_WhenFound() {
        when(supplierRepo.findById(1L)).thenReturn(Optional.of(supplier1));

        ResponseEntity<Supplier> response = supplierService.getSupplierById(1L);
        assertNotNull(response);
        assertEquals("Supplier One", response.getBody().getName());
    }

    @Test
    void testGetSupplierById_WhenNotFound() {
        when(supplierRepo.findById(3L)).thenReturn(Optional.empty());

        assertThrows(SupplierNotFoundException.class, () -> supplierService.getSupplierById(3L));
    }

    @Test
    void testAddSupplier() {
        when(supplierRepo.save(any(Supplier.class))).thenReturn(supplier1);

        ResponseEntity<Supplier> response = supplierService.addSupplier(supplier1);
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Supplier One", response.getBody().getName());
    }

    @Test
    void testUpdateSupplier_WhenFound() {
        when(supplierRepo.findById(1L)).thenReturn(Optional.of(supplier1));
        when(supplierRepo.save(any(Supplier.class))).thenReturn(supplier1);

        supplier1.setName("Updated Supplier");
        ResponseEntity<Supplier> response = supplierService.updateSupplier(1L, supplier1);

        assertNotNull(response);
        assertEquals("Updated Supplier", response.getBody().getName());
    }

    @Test
    void testUpdateSupplier_WhenNotFound() {
        when(supplierRepo.findById(3L)).thenReturn(Optional.empty());

        assertThrows(SupplierNotFoundException.class, () -> supplierService.updateSupplier(3L, supplier1));
    }

    @Test
    void testDeleteSupplier_WhenFound() {
        when(supplierRepo.findById(1L)).thenReturn(Optional.of(supplier1));
        doNothing().when(supplierRepo).delete(supplier1);

        ResponseEntity<String> response = supplierService.deleteSupplier(1L);
        assertNotNull(response);
        assertEquals("Supplier kicked out succesfully", response.getBody());
    }

    @Test
    void testDeleteSupplier_WhenNotFound() {
        when(supplierRepo.findById(3L)).thenReturn(Optional.empty());

        assertThrows(SupplierNotFoundException.class, () -> supplierService.deleteSupplier(3L));
    }
}

