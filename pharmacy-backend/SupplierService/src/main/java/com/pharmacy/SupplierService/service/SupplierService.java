package com.pharmacy.SupplierService.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.pharmacy.SupplierService.modal.Supplier;

public interface SupplierService {
	ResponseEntity<List<Supplier>> getAllSuppliers();
    ResponseEntity<Supplier> getSupplierById(Long id);
    ResponseEntity<Supplier> addSupplier(Supplier supplier);
    ResponseEntity<Supplier> updateSupplier(Long id, Supplier supplier);
    ResponseEntity<String> deleteSupplier(Long id);
}
