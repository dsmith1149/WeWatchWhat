package org.launchcode.BingeBuddy.data;

import org.launchcode.BingeBuddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserEntityRepository extends JpaRepository<User, Integer> {

    //Optional<User> findByEmail(String email);

    User findByUsername(String username);

}
