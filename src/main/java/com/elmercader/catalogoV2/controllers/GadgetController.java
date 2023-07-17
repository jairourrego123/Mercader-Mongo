package com.elmercader.catalogoV2.controllers;

import com.elmercader.catalogoV2.models.Gadget;
import com.elmercader.catalogoV2.services.GadgetServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gadget")
public class GadgetController {
    @Autowired
    private GadgetServices gadgetServices;

    @GetMapping("/all")
    public List<Gadget> getAllGadget() {
        return gadgetServices.getAllGadgets();
    }

    @GetMapping("/category/{category}")
    public List<Gadget> getAllGadgetByCategory(@PathVariable("category") String category) {
        return gadgetServices.getGadgetCByCategory(category);
    }

    @GetMapping("/name/{name}")
    public List<Gadget> getGadgetByName(@PathVariable("name") String name) {
        return gadgetServices.getGadgetByName(name);

    }

    @GetMapping("/price/{minPrice}/{maxPrice}")
    public List<Gadget> getGadgetByPriceRange(@PathVariable("minPrice") Double minPrice,@PathVariable("maxPrice") Double maxPrice) {
        return gadgetServices.getGadgetByPriceRange(minPrice, maxPrice);
    }

    @GetMapping("/availability/{availability}")
    public List<Gadget> getGadgetByAvailability(@PathVariable("availability") boolean availability) {
        return gadgetServices.getGadgetsByAvailability(availability);

    }

    @GetMapping("/gadgetId")
    public Optional<Gadget> getGadgetById(@PathVariable("gadgetId") Integer gadgetId) {
        return gadgetServices.getGadgetById(gadgetId);
    }
    @PostMapping("/new")
    public Gadget insertGadget(@RequestBody Gadget gadget) {
        return gadgetServices.insertGadget(gadget);
    }
    @PutMapping("/update")
    public Gadget updateGadget(@RequestBody Gadget gadget) {
        return  gadgetServices.updateGadget(gadget);
    }

    @DeleteMapping("/{gadget_id}")
    public void deleteGadget(@PathVariable("gadget_id") Integer gadgetId){
        gadgetServices.deleteGadget(gadgetId);
    }
}

}
