// UserFactory.java
package com.seif.api.factory;

import com.seif.api.dto.request.RegisterRequest;
import com.seif.api.model.User;

public interface UserFactory {

    User createUser(RegisterRequest request, String encodedPassword);

    default void applyCommonFields(User user, RegisterRequest request, String encodedPassword) {
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(request.getRole());
    }
}