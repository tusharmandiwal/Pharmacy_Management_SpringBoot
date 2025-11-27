package com.pharmacy.Order_Service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmacy.Order_Service.modal.Order;
import java.util.List;


public interface OrderRepo extends JpaRepository<Order, Long> {
	
	List<Order> findByDoctorEmail(String doctorEmail);

}
