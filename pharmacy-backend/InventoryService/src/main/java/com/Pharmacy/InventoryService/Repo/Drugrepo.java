package com.Pharmacy.InventoryService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Pharmacy.InventoryService.modal.Drug;

public interface Drugrepo extends JpaRepository<Drug, Long> {
	 Optional<Drug> findByName(String name);
}
