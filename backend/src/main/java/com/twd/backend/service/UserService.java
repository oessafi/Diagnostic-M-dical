package com.twd.backend.service;

import com.twd.backend.entity.Users;
import com.twd.backend.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private OurUserRepo usersRepository;

    public Optional<Users> getUserById(Integer id) {
        return usersRepository.findById(id).map(user -> {
            String reversedPassword = new StringBuilder(user.getPassword()).reverse().toString();
            user.setPassword(reversedPassword);
            return user;
        });
    }


    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users updateUser(Integer id, Users updatedUser) {
        return usersRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            return usersRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Integer id) {
        usersRepository.deleteById(id);
    }
}
