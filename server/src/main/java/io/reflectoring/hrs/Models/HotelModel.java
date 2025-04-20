package io.reflectoring.hrs.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;

import java.util.List;
import java.util.UUID;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Setter
@Getter
@Entity
@Table(name="hotels")
public class HotelModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "hotel_id")
    private UUID hid;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "hotel_address")
    private String hotelAddress;

    @Column(name = "hotel_city")
    private String hotelCity;

    @Column(name = "hotel_state")
    private String hotelState;

    @Column(name = "image")
    private String image;

    @Column(name = "pincode")
    private Integer pincode;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<RoomModel> rooms;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = true)
    @OnDelete(action = CASCADE)
    @JsonBackReference
    private StaffModel staff;
}
