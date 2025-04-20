package io.reflectoring.hrs.Controllers;

import io.reflectoring.hrs.Models.GuestModel;
import io.reflectoring.hrs.Services.GuestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/guest")
public class GuestController {

    private final GuestService guestService;
    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }


    @PostMapping("/create")
    public ResponseEntity<GuestModel> greateGuest(@RequestBody GuestModel guestModel) {
        return ResponseEntity.ok(guestService.addGuest(guestModel));
    }


    @GetMapping("/{phone}")
    public ResponseEntity<?> getGuestByPhone(@PathVariable("phone") String phone) {
        GuestModel response = guestService.findByNumber(phone);
        if(response!=null) {
            return ResponseEntity.ok(response);
        }else return ResponseEntity.notFound().build();
    }
}
