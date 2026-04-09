package com.seif.api.repository;

import com.seif.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA MAGIC: just by declaring these method names,
    // it automatically generates the SQL queries for you!

    Optional<User> findByEmail(String email);
    // → SELECT * FROM users WHERE email = ?

    boolean existsByEmail(String email);
    // → SELECT COUNT(*) > 0 FROM users WHERE email = ?
}