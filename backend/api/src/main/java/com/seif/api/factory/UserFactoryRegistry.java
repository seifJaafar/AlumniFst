// factory/UserFactoryRegistry.java
package com.seif.api.factory;

import com.seif.api.exception.ApiException;
import com.seif.api.model.enums.Role;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class UserFactoryRegistry {

    private final Map<Role, UserFactory> factories;

    // Spring injects all three factories — we wire them explicitly
    // so the mapping is clear and not dependent on bean naming tricks.
    public UserFactoryRegistry(
            AlumniFactory   alumniFactory,
            EtudiantFactory etudiantFactory,
            AdminFactory    adminFactory
    ) {
        this.factories = Map.of(
            Role.ALUMNI,   alumniFactory,
            Role.ETUDIANT, etudiantFactory,
            Role.ADMIN,    adminFactory
        );
    }

    public UserFactory getFactory(Role role) {
        UserFactory factory = factories.get(role);
        if (factory == null) {
            throw new ApiException("Unsupported role: " + role, HttpStatus.BAD_REQUEST);
        }
        return factory;
    }
}