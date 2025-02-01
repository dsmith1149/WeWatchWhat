package org.launchcode.BingeBuddy.service;


import org.launchcode.BingeBuddy.data.UserRepository;
import org.launchcode.BingeBuddy.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired // added now
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       BCryptPasswordEncoder bCryptPasswordEncoder1){

        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder1;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User userAuth){
        userAuth.setPassword(bCryptPasswordEncoder.encode(userAuth.getPassword()));
        return userRepository.save(userAuth);
    }

    public User updateUser(User userAuth){
        return userRepository.save(userAuth);
    }

    public void deleteUser(Integer id){
        userRepository.deleteById(id);;
    }

    public boolean authenticate(String username, String password){

        User user = userRepository.findByUsername(username);


        if(!bCryptPasswordEncoder.matches(password, user.getPassword())){
            throw new BadCredentialsException("The password is incorrect");
        }

        return true;
    }


}
