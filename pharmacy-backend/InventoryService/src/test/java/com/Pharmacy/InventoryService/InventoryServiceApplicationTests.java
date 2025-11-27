package com.Pharmacy.InventoryService;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.Pharmacy.InventoryService.Service.DrugService;

@SpringBootTest
class InventoryServiceApplicationTests {
	@Autowired
	private DrugService drugService;
	@Test
	void contextLoads() {
		assertThat(drugService).isNotNull();
	}

}
