package com.Pharmacy.InventoryService.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import com.Pharmacy.InventoryService.Client.SupplierServiceClient;
import com.Pharmacy.InventoryService.Dto.SupplierDto;
import com.Pharmacy.InventoryService.Exception.DrugNotFoundException;
import com.Pharmacy.InventoryService.Repo.Drugrepo;
import com.Pharmacy.InventoryService.modal.Drug;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DrugServiceImpl implements DrugService {
	
	@Autowired
	private Drugrepo drugrepo;
	
	private static final Logger logger = LoggerFactory.getLogger(DrugServiceImpl.class);
	@Autowired
	private SupplierServiceClient serviceClient;
	
	@Override
	public ResponseEntity<List<Drug>> getAll() {
		logger.info("Finding all avilable Drugs");
        List<Drug> drugs = drugrepo.findAll();
        return ResponseEntity.ok(drugs);
	}

	@Override
	public ResponseEntity<Drug> getDrugById(Long id) {
		logger.info("Fetching drug by ID: {}", id);
        Drug drug = drugrepo.findById(id)
                .orElseThrow(() -> new DrugNotFoundException("sorry Drug with ID " + id + " is not aviliable right now"));
        return ResponseEntity.ok(drug);
	}

	@Override
	public ResponseEntity<Drug> addDrug(Drug drug) {
		
		logger.info("Checking if drug exists with ID: {} or Name: {}", drug.getId(), drug.getName());

	   
	    if (drug.getId() != null && drugrepo.existsById(drug.getId())) {
	        logger.warn("Drug with ID {} already exists!", drug.getId());
	        throw new DrugNotFoundException("Drug with ID " + drug.getId() + " already exists!");
	    }

	   
	    if (drug.getName() != null) {
	        Optional<Drug> existingDrug = drugrepo.findByName(drug.getName());
	        if (existingDrug.isPresent()) {
	            logger.warn("Drug with Name '{}' already exists!", drug.getName());
	            throw new DrugNotFoundException( drug.getName() + " already exists! Plese update it");
	        }
	    }
		
		logger.info("Adding new drug:{}", drug.getName());
        Drug savedDrug = drugrepo.save(drug);
        return ResponseEntity.status(201).body(savedDrug);
	}

	@Override
	public ResponseEntity<Drug> updateDrug(Long id, Drug drug) {
	    logger.info("Updating drugs:{} ", id);
	    
	    Drug existingDrug = drugrepo.findById(id)
	            .orElseThrow(() -> new DrugNotFoundException("Drug with ID " + id + " not found"));

	    logger.info("Old Drug Details before update: {}", existingDrug);

	    if (drug.getName() != null) {
	        existingDrug.setName(drug.getName());
	    }
	    if (drug.getDescription() != null) {
	        existingDrug.setDescription(drug.getDescription());
	    }
	    if (drug.getQuantity() != 0) {
	        existingDrug.setQuantity(drug.getQuantity());
	    }
	    if (drug.getPrice() != 0.0) {
	        existingDrug.setPrice(drug.getPrice());
	    }
	    if (drug.getExpiryDate() !=null) {
	    	existingDrug.setExpiryDate(drug.getExpiryDate());
	    }

	    Drug updatedDrug = drugrepo.save(existingDrug);
	    logger.info("Updated drug successfully with new details: {}", updatedDrug);
	    
	    return ResponseEntity.ok(updatedDrug);
	}

	@Override
	public ResponseEntity<String> deleteDrug(Long id) {
		logger.info("Deleting in progress :{}", id);
        Drug drug = drugrepo.findById(id)
                .orElseThrow(() -> new DrugNotFoundException("Drug with ID " + id + " not found"));
        drugrepo.delete(drug);
        logger.info("Drug successfully removed: {}", id);
        return ResponseEntity.ok("Drug deleted successfully");
	}
	
	@Override
	public ResponseEntity<SupplierDto> getSupplierForDrug(Long drugId) {
	    logger.info("Fetching supplier details for Drug id: {}", drugId);

	    Drug drug = drugrepo.findById(drugId)
	            .orElseThrow(() -> new DrugNotFoundException("Drug with ID " + drugId + " not found"));

	    if (drug.getSupplierId() == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }

	    try {
	        SupplierDto supplier = serviceClient.getSupplierById(drug.getSupplierId());
	        return ResponseEntity.ok(supplier);
	    } catch (Exception e) {
	        logger.error("Error fetching supplier details for Drug ID {}: {}", drugId, e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@Override
	public double getDrugCount() {
		logger.info("Fetching total count of drugs");
		double count = drugrepo.findAll().stream().count();
		logger.info("Total drugs available: {}", count);
		return count;
	}

	@Override
	public ResponseEntity<Void> decreaseDrugStock(String drugName, int quantity) {
		logger.info("Decreasing stock for drug: {} by quantity: {}", drugName, quantity);
		
		Optional<Drug> optionalDrug = drugrepo.findByName(drugName);
		if (!optionalDrug.isPresent()) {
			logger.error("Drug with name {} not found", drugName);
			throw new DrugNotFoundException("Drug with name " + drugName + " not found");
		}

		Drug drug = optionalDrug.get();
		if (drug.getQuantity() < quantity) {
			logger.error("Insufficient stock for drug: {}. Available: {}, Requested: {}", drugName, drug.getQuantity(), quantity);
			throw new DrugNotFoundException("Insufficient stock for drug: " + drugName);
		}

		drug.setQuantity(drug.getQuantity() - quantity);
		drugrepo.save(drug);
		logger.info("Stock decreased successfully for drug: {}. New quantity: {}", drugName, drug.getQuantity());
		return ResponseEntity.ok().build();
	}

}
