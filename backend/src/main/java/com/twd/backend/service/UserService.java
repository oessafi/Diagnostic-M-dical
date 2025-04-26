package com.twd.backend.service;

import com.twd.backend.entity.Users;
import com.twd.backend.repository.OurUserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final OurUserRepo repo;

    public UserService(OurUserRepo repo) {
        this.repo = repo;
    }

    public List<Users> getAllUsers() {
        return repo.findAll();
    }

    public Optional<Users> getUserById(Integer id) {
        return repo.findById(id);
    }

    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }

}
