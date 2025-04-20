package io.reflectoring.hrs.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "guests")
public class GuestModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name  = "guest_id")
    private String gid;

    @Column(name = "guest_name")
    private String guestName;

    @Column(name = "guest_phone",unique = true)
    private String phone;

    @OneToMany(mappedBy = "guest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<BookingModel> bookings;
}
