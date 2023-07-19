package com.elmercader.catalogoV2.controllers;

import com.elmercader.catalogoV2.models.User;
import com.elmercader.catalogoV2.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userServices.getAllUsers();
    }

    @GetMapping("/zone/{zona}")
    public List<User> getUserByZone(@PathVariable("zone") String zone){
        return userServices.getUsersByZone(zone);
    }
    @GetMapping("/type/{type}")
    public List<User> getUserByType(@PathVariable("type") String type){
        return userServices.getUserByType(type);
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable("id") Integer id){
        return userServices.getUserById(id);

    }
    @GetMapping("/emailexist/{email}")
    public Boolean getUserByEmail(@PathVariable("email") String email){
        return userServices.getUserByEmail(email);
    }
    @GetMapping("/{email}/{password}")
    public Optional<User> validateUserLogin(@PathVariable("email") String email, @PathVariable("password") String password){

        return userServices.validateUserLogin(email,password);
    }

    @PostMapping("/new")
    public User insertUser(@RequestBody User user){
        return userServices.insertUser(user);
    }

    @PutMapping("/update")
    public User updateuser(@RequestBody User user){
        return userServices.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Integer userId){
        userServices.deleteUser(userId);
    }




}
