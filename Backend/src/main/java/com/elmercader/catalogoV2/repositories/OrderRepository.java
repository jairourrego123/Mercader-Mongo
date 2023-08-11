package com.elmercader.catalogoV2.repositories;

import com.elmercader.catalogoV2.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order,Integer> {
    @Query("{status: ?0}")
    public List<Order> findOrderByStatus(String status);
    @Query("{salesman.zone: ?0}")
    public List<Order> findOrderByZone(String zone);
}
