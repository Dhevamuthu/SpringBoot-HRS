package io.reflectoring.hrs.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.reflectoring.hrs.Dto.ErrorResponse;
import io.reflectoring.hrs.Models.RoomModel;
import io.reflectoring.hrs.Services.CloudinaryService;
import io.reflectoring.hrs.Services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public RoomController(RoomService roomService,CloudinaryService cloudinaryService) {
        this.roomService = roomService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/create")
    public ResponseEntity<RoomModel> createRoom(@RequestParam("room") String room,@RequestParam(value = "image",required = false) MultipartFile image){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            RoomModel roomModel = objectMapper.readValue(room, RoomModel.class);
            String imageURl = cloudinaryService.uploadImage(image);
            roomModel.setImage(imageURl);
            return ResponseEntity.status(200).body(roomService.createRoom(roomModel));
        }
        catch(Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> updateRoom(@RequestParam("room") String room,@RequestParam(value = "image",required = false) MultipartFile image, @PathVariable("id") UUID id){
       try{
           ObjectMapper objectMapper = new ObjectMapper();
           RoomModel roomModel = objectMapper.readValue(room, RoomModel.class);
           String imageURl = cloudinaryService.uploadImage(image);
           roomModel.setImage(imageURl);
            RoomModel response = roomService.updateRoom(id, roomModel);
            return ResponseEntity.status(200).body((response == null ? new ErrorResponse("No data found") : response));
        }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
       }
    }

    @PutMapping("/updateBooking/{id}")
    public ResponseEntity<RoomModel> updateRoomBooking(@RequestBody RoomModel roomModel, @PathVariable("id") UUID id){
        return ResponseEntity.status(200).body(roomService.updateBooking(id, roomModel));
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<List<RoomModel>> getRoomById(@PathVariable("id") UUID id){
        try{
            return ResponseEntity.status(200).body(roomService.getAllRooms(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}