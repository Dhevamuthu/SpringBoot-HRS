package io.reflectoring.hrs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class HrsApplication {
	public static void main(String[] args) {
		SpringApplication.run(HrsApplication.class, args);
	}
}
