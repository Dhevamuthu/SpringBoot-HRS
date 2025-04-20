package io.reflectoring.hrs.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Set;
import java.util.UUID;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Setter
@Getter
@Entity
@Table(name = "bookings")
public class BookingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "booking_id")
    private UUID bid;

    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = false)
    @OnDelete(action = CASCADE)
    @JsonBackReference
    private GuestModel guest;

    @Column(name = "booked_date", nullable = false)
    private String bookedDate;

    @Column(name = "Booked_untill", nullable = false)
    private String bookedUntill;

    @ManyToMany
    @JoinTable(
            name = "booking_rooms",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    @JsonIgnore
    private Set<RoomModel> rooms;
}
