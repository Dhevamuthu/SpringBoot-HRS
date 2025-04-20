package io.reflectoring.hrs.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "staffs")
public class StaffModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "staff_id")
    private UUID sid;

    @Column(name = "staff_name")
    private String staffName;

    @Column(name = "staff_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<HotelModel> hotels;
}
