package com.pharmacy.SupplierService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmacy.SupplierService.modal.Supplier;

public interface SupplierRepo  extends JpaRepository<Supplier, Long>{
	Optional<Supplier> findByEmail(String email);

}
