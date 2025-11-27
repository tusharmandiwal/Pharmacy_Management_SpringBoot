package com.Pharmacy.InventoryService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Pharmacy.InventoryService.Dto.SupplierDto;
import com.Pharmacy.InventoryService.Service.DrugService;
import com.Pharmacy.InventoryService.modal.Drug;

@RestController
@RequestMapping("drug")
public class DrugController {
	@Autowired
	private DrugService drugService;

	@GetMapping
	public ResponseEntity<List<Drug>> getAllDrugs() {
		return drugService.getAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Drug> getDrugById(@PathVariable Long id) {
		return drugService.getDrugById(id);
	}

	@GetMapping("/{id}/supplier")
	public ResponseEntity<SupplierDto> getSupplierForDrug(@PathVariable Long id) {
		SupplierDto supplier = drugService.getSupplierForDrug(id).getBody();

		if (supplier == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		return ResponseEntity.ok(supplier);
	}

	@PostMapping("/add")
	public ResponseEntity<Drug> addDrug(@RequestBody Drug drug) {
		return drugService.addDrug(drug);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Drug> updateDrug(@PathVariable Long id, @RequestBody Drug updatedDrug) {
		return drugService.updateDrug(id, updatedDrug);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteDrug(@PathVariable Long id) {
		return drugService.deleteDrug(id);
	}
	@GetMapping("/count")
	public ResponseEntity<Double> getDrugCount() {
		double count = drugService.getDrugCount();
		return ResponseEntity.ok(count);
	}
	@PutMapping("decreaseStock/{name}")
	public ResponseEntity<Void> decreaseDrugStock(@PathVariable String name,@RequestParam int quantity) {
		return drugService.decreaseDrugStock(name, quantity);
	}
}
