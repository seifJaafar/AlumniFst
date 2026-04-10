package com.seif.api.factory;
import org.springframework.stereotype.Component;

import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.model.Admin;
import com.seif.api.model.User;

@Component
public class AdminFactory implements UserFactory {
    @Override
    public User createUser(RegisterRequest request, String encodedPassword) {
        Admin admin = new Admin();
        applyCommonFields(admin, request, encodedPassword);
        return admin;
    }
}