package com.elmercader.catalogoV2.services;

import com.elmercader.catalogoV2.models.User;
import com.elmercader.catalogoV2.repositories.UserRepository;
import org.springframework.beans.InvalidPropertyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }

    public List<User> getUsersByZone(String zone){
        String zone_L = zone.toLowerCase();
        return userRepository.getUserByZone(zone_L);
    }

    public  List<User> getUserByType(String type){
        String type_L = type.toLowerCase();
        return userRepository.getUserByType(type);
    }
    public Optional<User> getUserById(Integer id){

        return userRepository.getUserById(id);
    }
    public Boolean getUserByEmail(String email){
        if(Utilities.validateEmail(email)){
            return userRepository.getUserByEmail(email).isPresent()?true:false;
        }
        else {

          // TODO add a nice exception
            return false;
        }
    }
    public Optional<User> validateUserLogin(String email, String password){
        System.out.println(email+ " "+password);
        if (Utilities.validateEmail(email)){

            if (password.length()>=6) {
                Optional<User> temp_1 = userRepository.validateLogin(email,password);
                if (temp_1.isPresent())
                    return temp_1;
                else{
                    User user = new User();
                    return Optional.of(user);
                }

            }
            else
                return null;
        }
        else
            return null;
    }

    public User insertUser(User user){
        if(Utilities.validateEmail(user.getEmail())){

            Optional<User> temp = userRepository.getUserByEmail(user.getEmail());

            if(temp.isEmpty()) {
                user.setType(user.getType().toUpperCase());
                user.setZone(user.getZone().toUpperCase());
                return userRepository.save(user);
            }
            else
                //TODO use a better exception

                return user;
        }
        else
            return user;
    }
    public User updateUser(User user){

        Optional<User> tempUser = userRepository.getUserById(user.getId());
        if(tempUser.isPresent()){
            if(user.getName() != null)
                tempUser.get().setName(user.getName());
            if(user.getAddress()!=null)
                tempUser.get().setAddress(user.getAddress());
            if(user.getCellPhone()!= null)
                tempUser.get().setCellPhone(user.getCellPhone());
            if (user.getPassword()!=null)
                tempUser.get().setPassword(user.getPassword());
            if(user.getZone()!=null)
                tempUser.get().setZone(user.getZone());
            if (user.getType()!= null)
                tempUser.get().setType(user.getType());

            return userRepository.save(tempUser.get());
        }
        else
            return user;


    }


    public void deleteUser(Integer userId){
        // TODO check if it is better to use getUserById
        Optional<User> tempUser = userRepository.findById(userId);
        if (tempUser.isPresent())
            userRepository.delete(tempUser.get());
        // TODO  add exception ResourceNotFoundException


    }
}
