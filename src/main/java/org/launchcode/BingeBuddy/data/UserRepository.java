package org.launchcode.BingeBuddy.data;

import org.launchcode.BingeBuddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //Optional<User> findByEmail(String email);

    User findByUsername(String username);

}
