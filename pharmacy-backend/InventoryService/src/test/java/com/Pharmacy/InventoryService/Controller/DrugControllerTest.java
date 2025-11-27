package com.Pharmacy.InventoryService.Controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.Pharmacy.InventoryService.Dto.SupplierDto;
import com.Pharmacy.InventoryService.Service.DrugService;
import com.Pharmacy.InventoryService.modal.Drug;
import com.fasterxml.jackson.databind.ObjectMapper;

class DrugControllerTest {

	private MockMvc mockMvc;

	@Mock
	private DrugService drugService;

	@InjectMocks
	private DrugController drugController;

	private Drug drug;
	private SupplierDto supplierDto;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(drugController).build();

		drug = new Drug();
		drug.setId(1L);
		drug.setName("Paracetamol");
		drug.setQuantity(10);
		drug.setPrice(5.99);
		drug.setSupplierId(100L);

		supplierDto = new SupplierDto();
		supplierDto.setId(100L);
		supplierDto.setName("Supplier A");
	}

	@Test
	void testGetAllDrugs() throws Exception {
		List<Drug> drugs = Arrays.asList(drug);
		when(drugService.getAll()).thenReturn(ResponseEntity.ok(drugs));

		mockMvc.perform(get("/drug")).andExpect(status().isOk()).andExpect(jsonPath("$.size()").value(1))
				.andExpect(jsonPath("$[0].name").value("Paracetamol"));

		verify(drugService, times(1)).getAll();
	}

	@Test
	void testGetDrugById() throws Exception {
		when(drugService.getDrugById(1L)).thenReturn(ResponseEntity.ok(drug));

		mockMvc.perform(get("/drug/1")).andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Paracetamol"));

		verify(drugService, times(1)).getDrugById(1L);
	}

	@Test
	void testGetSupplierForDrug() throws Exception {
		when(drugService.getSupplierForDrug(1L)).thenReturn(ResponseEntity.ok(supplierDto));

		mockMvc.perform(get("/drug/1/supplier")).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("Supplier A"));

		verify(drugService, times(1)).getSupplierForDrug(1L);
	}

	@Test
	void testAddDrug() throws Exception {
		when(drugService.addDrug(any(Drug.class))).thenReturn(ResponseEntity.status(201).body(drug));

		mockMvc.perform(post("/drug").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(drug))).andExpect(status().isCreated())
				.andExpect(jsonPath("$.name").value("Paracetamol"));

		verify(drugService, times(1)).addDrug(any(Drug.class));
	}

	@Test
	void testUpdateDrug() throws Exception {
		Drug updatedDrug = new Drug();
		updatedDrug.setId(1L);
		updatedDrug.setName("Updated Paracetamol");

		when(drugService.updateDrug(eq(1L), any(Drug.class))).thenReturn(ResponseEntity.ok(updatedDrug));

		mockMvc.perform(put("/drug/1").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(updatedDrug))).andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("Updated Paracetamol"));

		verify(drugService, times(1)).updateDrug(eq(1L), any(Drug.class));
	}

	@Test
	void testDeleteDrug() throws Exception {
		when(drugService.deleteDrug(1L)).thenReturn(ResponseEntity.ok("Drug deleted successfully"));

		mockMvc.perform(delete("/drug/1")).andExpect(status().isOk())
				.andExpect(content().string("Drug deleted successfully"));

		verify(drugService, times(1)).deleteDrug(1L);
	}
}
