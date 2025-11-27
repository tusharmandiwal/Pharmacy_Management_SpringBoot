package com.pharmacy.SupplierService.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pharmacy.SupplierService.modal.Supplier;
import com.pharmacy.SupplierService.service.SupplierService;

@RestController
@RequestMapping("supplier")
public class SupplierController {

	private SupplierService supplierService;

	public SupplierController(SupplierService supplierService) {
		super();
		this.supplierService = supplierService;
	}

	@GetMapping
	public ResponseEntity<List<Supplier>> getAllSuppliers() {
		return supplierService.getAllSuppliers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
		return supplierService.getSupplierById(id);
	}

	@PostMapping
	public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
		return supplierService.addSupplier(supplier);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
		return supplierService.updateSupplier(id, supplier);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
		return supplierService.deleteSupplier(id);
	}
}
