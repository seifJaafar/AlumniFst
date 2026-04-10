package com.seif.api.factory;
import org.springframework.stereotype.Component;

import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.model.Alumni;
import com.seif.api.model.User;

@Component
public class AlumniFactory implements UserFactory {
    @Override
    public User createUser(RegisterRequest request, String encodedPassword) {
        Alumni alumni = new Alumni();
        applyCommonFields(alumni, request, encodedPassword);
        alumni.setPromotion(request.getPromotion());
        alumni.setGraduationYear(request.getPromotionYear());
        return alumni;
    }
}