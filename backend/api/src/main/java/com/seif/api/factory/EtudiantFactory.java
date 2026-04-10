package com.seif.api.factory;
import org.springframework.stereotype.Component;

import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.model.Etudiant;
import com.seif.api.model.User;

@Component
public class EtudiantFactory implements UserFactory {
    @Override
    public User createUser(RegisterRequest request, String encodedPassword) {
        Etudiant etudiant = new Etudiant();
        applyCommonFields(etudiant, request, encodedPassword);
        etudiant.setPromotion(request.getPromotion()); // @NotBlank but unknown at registration
        return etudiant;
    }
}