package io.reflectoring.hrs.Repositories;

import io.reflectoring.hrs.Models.HotelModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HotelRepository extends JpaRepository<HotelModel, UUID> {
}
