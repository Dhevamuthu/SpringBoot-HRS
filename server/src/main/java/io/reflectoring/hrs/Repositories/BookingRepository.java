package io.reflectoring.hrs.Repositories;

import io.reflectoring.hrs.Models.BookingModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookingRepository extends JpaRepository<BookingModel, UUID> {
}
