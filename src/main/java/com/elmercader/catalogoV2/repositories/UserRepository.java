package com.elmercader.catalogoV2.repositories;

import com.elmercader.catalogoV2.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<User,Integer> {

    // Equivalente al las consultas SQL que requerimos realizar
    @Query("{id: ?0}")
    Optional<User> getUserById(Integer id);
    @Query("{email: ?0}")
    Optional<User> getUserByEmail(String email);
    @Query("{zone: ?0}")
    List<User> getUserByZone(String zone);
    @Query("{type: ?0}")
    List<User> getUserByType(String type);
    @Query("{$and: [{email: ?0}, {password: ?1}]}")
    Optional<User> validateLogin(String email,String password);


}
