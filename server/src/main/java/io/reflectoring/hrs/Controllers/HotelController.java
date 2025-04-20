package io.reflectoring.hrs.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.reflectoring.hrs.Models.HotelModel;
import io.reflectoring.hrs.Services.CloudinaryService;
import io.reflectoring.hrs.Services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/hotel")
public class HotelController {

    private final HotelService hotelService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public HotelController(HotelService hotelService, CloudinaryService cloudinaryService) {
        this.hotelService = hotelService;
        this.cloudinaryService = cloudinaryService;
    }


    @PostMapping("/create")
    public ResponseEntity<HotelModel> createHotel(@RequestParam("hotel") String hotel,@RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            HotelModel hotelModel = objectMapper.readValue(hotel, HotelModel.class);
            System.out.println(hotelModel);
            String imageURL = cloudinaryService.uploadImage(image);
            hotelModel.setImage(imageURL);
            System.out.println(imageURL);
            return ResponseEntity.status(200).body(hotelService.createHotel(hotelModel));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HotelModel> updateHotel(@RequestParam("hotel") String hotel,@RequestParam(value = "image" , required = false) MultipartFile image,@PathVariable("id") UUID id) {
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            HotelModel hotelModel = objectMapper.readValue(hotel, HotelModel.class);
            String imageURL = cloudinaryService.uploadImage(image);
            return ResponseEntity.ok(hotelService.updateHotel(id, hotelModel));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HotelModel> deleteHotel(@PathVariable("id") UUID id) {
        try{
            hotelService.deleteHotel(id);
            return ResponseEntity.status(200).build();
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}