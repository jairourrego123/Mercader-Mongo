package com.elmercader.catalogoV2.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "gadgets")
public class Gadget {
    private Integer id;
    private Integer code;
    private String brand;
    private String category;
    private String name;
    private String description;
    private Double price;
    private Boolean availability = true;
    private Integer quantity;
    private String photography;
}
