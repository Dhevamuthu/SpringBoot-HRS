package io.reflectoring.hrs.Repositories;

import io.reflectoring.hrs.Models.GuestModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface GuestRepository extends JpaRepository<GuestModel, UUID> {
    GuestModel findByPhone(@Param("guest_phone") String phone);
}
