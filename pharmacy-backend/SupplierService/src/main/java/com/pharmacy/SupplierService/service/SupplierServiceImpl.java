package com.pharmacy.SupplierService.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.pharmacy.SupplierService.Exception.SupplierNotFoundException;
import com.pharmacy.SupplierService.Repo.SupplierRepo;
import com.pharmacy.SupplierService.modal.Supplier;

@Service
public class SupplierServiceImpl  implements SupplierService{
	
	private static final Logger logger = LoggerFactory.getLogger(SupplierServiceImpl.class);
	
	private SupplierRepo supplierRepo;
	public SupplierServiceImpl(SupplierRepo supplierRepo) {
		this.supplierRepo = supplierRepo;
	}

	@Override
	public ResponseEntity<List<Supplier>> getAllSuppliers() {
		logger.info("Getting all avilable suppliers");
		return ResponseEntity.ok(supplierRepo.findAll());
	}

	@Override
	public ResponseEntity<Supplier> getSupplierById(Long id) {
		logger.info("Getting details if  supplier with id: {}", id);
		Supplier supplier = supplierRepo.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException("The supplier whom you are finding is not available"));
        return ResponseEntity.ok(supplier);
	}

	@Override
	public ResponseEntity<Supplier> addSupplier(Supplier supplier) {
	    Optional<Supplier> existingSupplier = supplierRepo.findByEmail(supplier.getEmail());
	    
	    if (existingSupplier.isPresent()) {
	        logger.warn("Supplier with email {} already exists", supplier.getEmail());
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(null); 
	    }

	    logger.info("Creating new supplier: {}", supplier.getName());
	    return ResponseEntity.status(HttpStatus.CREATED).body(supplierRepo.save(supplier));
	}


	@Override
	public ResponseEntity<Supplier> updateSupplier(Long id, Supplier supplier) {
		logger.info("Updating details of  supplier with ID: {}", id);
        Supplier existingSupplier = supplierRepo.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException("The supplier whom you are finding is not available"));

        if (supplier.getName() != null) existingSupplier.setName(supplier.getName());
        if (supplier.getContactNumber() != null) existingSupplier.setContactNumber(supplier.getContactNumber());
        if (supplier.getEmail() != null) existingSupplier.setEmail(supplier.getEmail());
        if (supplier.getAddress() != null) existingSupplier.setAddress(supplier.getAddress());

        return ResponseEntity.ok(supplierRepo.save(existingSupplier));
	}

	@Override
	public ResponseEntity<String> deleteSupplier(Long id) {
		logger.info("Deleting supplier with ID: {}", id);
        Supplier supplier = supplierRepo.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException("The supplier whom you are finding is not available"));

        supplierRepo.delete(supplier);
        return ResponseEntity.ok("Supplier kicked out succesfully");
	}

}
