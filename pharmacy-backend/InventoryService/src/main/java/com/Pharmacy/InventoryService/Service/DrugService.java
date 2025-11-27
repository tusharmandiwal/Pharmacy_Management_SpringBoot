package com.Pharmacy.InventoryService.Service;


import java.util.List;
import org.springframework.http.ResponseEntity;

import com.Pharmacy.InventoryService.Dto.SupplierDto;
import com.Pharmacy.InventoryService.modal.Drug;
public interface DrugService {

	ResponseEntity<List<Drug>> getAll();
    ResponseEntity<Drug> getDrugById(Long id);
    ResponseEntity<Drug> addDrug(Drug drug);
    ResponseEntity<Drug> updateDrug(Long id, Drug drug);
    ResponseEntity<String> deleteDrug(Long id);
	ResponseEntity<SupplierDto> getSupplierForDrug(Long drugId);
	double getDrugCount();
	
}
