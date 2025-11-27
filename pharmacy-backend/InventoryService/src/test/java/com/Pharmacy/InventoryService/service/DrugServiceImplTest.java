package com.Pharmacy.InventoryService.service;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.Pharmacy.InventoryService.Client.SupplierServiceClient;
import com.Pharmacy.InventoryService.Dto.SupplierDto;
import com.Pharmacy.InventoryService.Exception.DrugNotFoundException;
import com.Pharmacy.InventoryService.Repo.Drugrepo;
import com.Pharmacy.InventoryService.Service.DrugServiceImpl;
import com.Pharmacy.InventoryService.modal.Drug;

class DrugServiceImplTest {

    @Mock
    private Drugrepo drugrepo;

    @Mock
    private SupplierServiceClient serviceClient;

    @InjectMocks
    private DrugServiceImpl drugService;

    private Drug drug;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        drug = new Drug();
        drug.setId(1L);
        drug.setName("Paracetamol");
        drug.setQuantity(10);
        drug.setPrice(5.99);
        drug.setSupplierId(100L);
    }

    @Test
    void testGetAllDrugs() {
        List<Drug> drugs = Arrays.asList(drug);
        when(drugrepo.findAll()).thenReturn(drugs);

        ResponseEntity<List<Drug>> response = drugService.getAll();

        assertEquals(1, response.getBody().size());
        verify(drugrepo, times(1)).findAll();
    }

    @Test
    void testGetDrugById_Success() {
        when(drugrepo.findById(1L)).thenReturn(Optional.of(drug));

        ResponseEntity<Drug> response = drugService.getDrugById(1L);

        assertEquals("Paracetamol", response.getBody().getName());
        verify(drugrepo, times(1)).findById(1L);
    }

    @Test
    void testGetDrugById_NotFound() {
        when(drugrepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DrugNotFoundException.class, () -> drugService.getDrugById(1L));
        verify(drugrepo, times(1)).findById(1L);
    }

    @Test
    void testAddDrug_Success() {
        when(drugrepo.existsById(1L)).thenReturn(false);
        when(drugrepo.findByName("Paracetamol")).thenReturn(Optional.empty());
        when(drugrepo.save(drug)).thenReturn(drug);

        ResponseEntity<Drug> response = drugService.addDrug(drug);

        assertEquals("Paracetamol", response.getBody().getName());
        verify(drugrepo, times(1)).save(drug);
    }

    @Test
    void testAddDrug_AlreadyExists() {
        when(drugrepo.findByName("Paracetamol")).thenReturn(Optional.of(drug));

        assertThrows(DrugNotFoundException.class, () -> drugService.addDrug(drug));
    }

    @Test
    void testUpdateDrug_Success() {
        Drug updatedDrug = new Drug();
        updatedDrug.setName("Updated Paracetamol");

        when(drugrepo.findById(1L)).thenReturn(Optional.of(drug));
        when(drugrepo.save(any(Drug.class))).thenReturn(updatedDrug);

        ResponseEntity<Drug> response = drugService.updateDrug(1L, updatedDrug);

        assertEquals("Updated Paracetamol", response.getBody().getName());
        verify(drugrepo, times(1)).save(any(Drug.class));
    }

    @Test
    void testUpdateDrug_NotFound() {
        when(drugrepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DrugNotFoundException.class, () -> drugService.updateDrug(1L, drug));
    }

    @Test
    void testDeleteDrug_Success() {
        when(drugrepo.findById(1L)).thenReturn(Optional.of(drug));
        doNothing().when(drugrepo).delete(drug);

        ResponseEntity<String> response = drugService.deleteDrug(1L);

        assertEquals("Drug deleted successfully", response.getBody());
        verify(drugrepo, times(1)).delete(drug);
    }

    @Test
    void testDeleteDrug_NotFound() {
        when(drugrepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DrugNotFoundException.class, () -> drugService.deleteDrug(1L));
    }

    @Test
    void testGetSupplierForDrug_Success() {
        SupplierDto supplierDto = new SupplierDto();
        supplierDto.setId(100L);
        supplierDto.setName("Supplier A");

        when(drugrepo.findById(1L)).thenReturn(Optional.of(drug));
        when(serviceClient.getSupplierById(100L)).thenReturn(supplierDto);

        ResponseEntity<SupplierDto> response = drugService.getSupplierForDrug(1L);

        assertEquals("Supplier A", response.getBody().getName());
        verify(serviceClient, times(1)).getSupplierById(100L);
    }

    @Test
    void testGetSupplierForDrug_NotFound() {
        when(drugrepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(DrugNotFoundException.class, () -> drugService.getSupplierForDrug(1L));
    }
}

