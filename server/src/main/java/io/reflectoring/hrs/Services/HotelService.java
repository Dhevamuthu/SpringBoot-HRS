package io.reflectoring.hrs.Services;

import io.reflectoring.hrs.Models.HotelModel;
import io.reflectoring.hrs.Repositories.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;

    @Autowired
    HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public HotelModel createHotel(HotelModel hotelModel) {
        return hotelRepository.save(hotelModel);
    }

    public List<HotelModel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public HotelModel updateHotel(UUID id,HotelModel hotelModel) {
        HotelModel existHotel = hotelRepository.findById(id).orElse(null);
        if(existHotel != null){
            existHotel.setHotelCity(Optional.ofNullable(hotelModel.getHotelCity()).orElse(existHotel.getHotelCity()));
            existHotel.setHotelAddress(Optional.ofNullable(hotelModel.getHotelAddress()).orElse(existHotel.getHotelAddress()));
            existHotel.setPincode(Optional.ofNullable(hotelModel.getPincode()).orElse(existHotel.getPincode()));
            existHotel.setHotelState(Optional.ofNullable(hotelModel.getHotelState()).orElse(existHotel.getHotelState()));
            existHotel.setHotelName(Optional.ofNullable(hotelModel.getHotelName()).orElse(existHotel.getHotelName()));
            return hotelRepository.save(existHotel);
        }else return null;
    }

    public boolean deleteHotel(UUID id) {
        try{
            hotelRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            throw e;
        }
    }
}
