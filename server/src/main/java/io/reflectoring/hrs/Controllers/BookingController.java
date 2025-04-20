package io.reflectoring.hrs.Controllers;


import io.reflectoring.hrs.Models.BookingModel;
import io.reflectoring.hrs.Services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<Object> addBooking(@RequestBody BookingModel bookingModel) {
        try {
            BookingModel savedbooking = bookingService.createBooking(bookingModel);
            return ResponseEntity.status(200).body(savedbooking);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

}
