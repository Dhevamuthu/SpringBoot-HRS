package io.reflectoring.hrs.Controllers;

import io.reflectoring.hrs.Dto.AuthResponse;
import io.reflectoring.hrs.Models.StaffModel;
import io.reflectoring.hrs.Services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.reflectoring.hrs.Dto.ErrorResponse;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;

    }


    @PostMapping("/create")
    public ResponseEntity<Object> createStaff(@RequestBody StaffModel staffModel) {
        try{
            System.out.println("creating staff");
            staffModel.setPassword(staffService.hashPassword(staffModel.getPassword()));
            return ResponseEntity.status(HttpStatus.CREATED).body(staffService.createStaff(staffModel));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(STR."Email ID \{staffModel.getEmail()} already exists"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody StaffModel staffModel){
        try {
            StaffModel existUser = staffService.getStaffById(staffModel.getEmail());
            if(existUser != null){
                boolean isMatch = staffService.checkPassword(staffModel.getPassword(), existUser.getPassword());
                if(isMatch){
                    return ResponseEntity.status(HttpStatus.OK).body(existUser);
                }else return ResponseEntity.badRequest().body(new ErrorResponse("Invalid credentials"));
            }else return ResponseEntity.status(404).body(new ErrorResponse("User Not Exist"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StaffModel> updateStaff(@PathVariable("id") UUID id, @RequestBody StaffModel updatestaff){
        StaffModel updateStaff= staffService.updateStaff(id,updatestaff);
        return ResponseEntity.ok().body(updateStaff);
    }
}
