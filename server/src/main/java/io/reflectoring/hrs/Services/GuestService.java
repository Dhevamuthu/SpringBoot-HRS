package io.reflectoring.hrs.Services;

import io.reflectoring.hrs.Models.GuestModel;
import io.reflectoring.hrs.Repositories.GuestRepository;
import org.springframework.stereotype.Service;

@Service
public class GuestService {
    private final GuestRepository guestRepository;
    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }


    public GuestModel addGuest(GuestModel guest) {
        return guestRepository.save(guest);
    }

    public GuestModel findByNumber(String phone) {
        return guestRepository.findByPhone(phone);
    }
}
