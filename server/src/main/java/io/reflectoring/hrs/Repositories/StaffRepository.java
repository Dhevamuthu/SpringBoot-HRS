package io.reflectoring.hrs.Repositories;

import io.reflectoring.hrs.Models.StaffModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<StaffModel, UUID> {
    Optional<Object> findByEmail(String email);
}
