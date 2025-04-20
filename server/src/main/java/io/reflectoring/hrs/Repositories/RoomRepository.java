package io.reflectoring.hrs.Repositories;

import io.reflectoring.hrs.Models.HotelModel;
import io.reflectoring.hrs.Models.RoomModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<RoomModel, UUID> {
    List<RoomModel> findByRoomNumberAndHotel(String roomNumber, HotelModel hotel);

    List<RoomModel> findAllByHotel(HotelModel hotelModel);
}
