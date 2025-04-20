package io.reflectoring.hrs.Services;

import io.reflectoring.hrs.Models.StaffModel;
import io.reflectoring.hrs.Repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StaffService {
    private final StaffRepository staffRepository;
    private final PasswordEncoder encrypt;

    @Autowired
    public StaffService(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
        this.staffRepository = staffRepository;
        this.encrypt = passwordEncoder;
    }

    public StaffModel createStaff(StaffModel staffModel) {
        return staffRepository.save(staffModel);
    }

    public String hashPassword(String password) {
        return encrypt.encode(password);
    }
    public boolean checkPassword(String password, String hashedPassword) {
        return encrypt.matches(password, hashedPassword);
    }

    public StaffModel getStaffById(String email){
        return (StaffModel) staffRepository.findByEmail(email).orElse(null);
    }

    public StaffModel updateStaff(UUID id, StaffModel updateData) {
        StaffModel staff = staffRepository.findById(id).orElse(null);
        if(staff != null){
            staff.setEmail(Optional.ofNullable(updateData.getEmail()).orElse(staff.getEmail()));
            staff.setStaffName(Optional.ofNullable(updateData.getStaffName()).orElse(staff.getStaffName()));
            staffRepository.save(staff);
            return staff;
        }
        else{
            return null;
        }
    }
}
