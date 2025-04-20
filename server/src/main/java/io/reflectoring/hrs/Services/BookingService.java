package io.reflectoring.hrs.Services;

import io.reflectoring.hrs.Models.BookingModel;
import io.reflectoring.hrs.Repositories.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;

@Service
public class BookingService {
    public BookingRepository bookingRepository;
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingModel createBooking(BookingModel bookingModel) {
        return bookingRepository.save(bookingModel);
    }

}
