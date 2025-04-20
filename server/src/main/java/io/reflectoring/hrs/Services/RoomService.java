package io.reflectoring.hrs.Services;


import io.reflectoring.hrs.Models.HotelModel;
import io.reflectoring.hrs.Models.RoomModel;
import io.reflectoring.hrs.Repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    public RoomModel createRoom(RoomModel roomModel){
        List<RoomModel> room = roomRepository.findByRoomNumberAndHotel(roomModel.getRoomNumber(),roomModel.getHotel());
        if(room.isEmpty()) {
            System.out.println("hello");
            return roomRepository.save(roomModel);
        }else return room.getFirst();
    }

    public RoomModel updateRoom(UUID id, RoomModel roomModel){
        Optional<RoomModel> room = roomRepository.findById(id);
        room.ifPresent(model -> model.setRoomNumber(roomModel.getRoomNumber()));
        room.ifPresent(model -> model.setHotel(roomModel.getHotel()));
        room.ifPresent(model -> model.setPrice(roomModel.getPrice()));
        if(!roomModel.getImage().isEmpty()) room.ifPresent(model -> model.setImage(roomModel.getImage()));
        return room.map(roomRepository::save).orElse(null);
    }

    public RoomModel updateBooking(UUID id, RoomModel roomModel){
        Optional<RoomModel> room = roomRepository.findById(id);
        room.ifPresent(model -> model.setBookedUntill(roomModel.getBookedUntill()));
        return room.map(roomRepository::save).orElse(null);
    }

    public List<RoomModel> getAllRooms(UUID id){
        HotelModel hotel = new HotelModel();
        hotel.setHid(id);
        return roomRepository.findAllByHotel(hotel);
    }
}
