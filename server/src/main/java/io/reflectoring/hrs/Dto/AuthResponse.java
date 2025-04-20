package io.reflectoring.hrs.Dto;

import io.reflectoring.hrs.Models.HotelModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class AuthResponse {

    private String email;
    private String token;
    private UUID sid;
    private String staffName;
    List<HotelModel> hotels;

    public AuthResponse(){
    }

    public AuthResponse(String email, String token, UUID sid,String staffName,List<HotelModel> hotel) {
        this.email = email;
        this.token = token;
        this.sid = sid;
        this.staffName = staffName;
        this.hotels = hotel;
    }
}
