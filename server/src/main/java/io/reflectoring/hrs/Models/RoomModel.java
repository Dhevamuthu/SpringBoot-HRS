package io.reflectoring.hrs.Models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;

import java.util.*;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Setter
@Getter
@Entity
@Table(name="rooms")
public class RoomModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "room_id")
    private UUID rid;


    @Column(name = "image")
    private String image;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;
    @Column(name = "room_desc")
    private String roomDesc;

    @Column(name = "room_price")
    private Double price;

    @Column(name = "Booked_untill")
    private String bookedUntill;
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    @OnDelete(action = CASCADE)
    @JsonBackReference
    private HotelModel hotel;

    @ManyToMany(mappedBy = "rooms", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<BookingModel> bookings;

}
