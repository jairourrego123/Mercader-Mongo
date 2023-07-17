package com.elmercader.catalogoV2.services;

import com.elmercader.catalogoV2.models.Gadget;
import com.elmercader.catalogoV2.repositories.GadgetRepository;
import com.mongodb.client.model.ReturnDocument;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class GadgetServices {
    @Autowired
    GadgetRepository gadgetRepository;

    public List<Gadget> getAllGadgets(){
        return (List<Gadget>) gadgetRepository.findAll();
    }
    public List<Gadget> getGadgetCByCategory(String category){
        return gadgetRepository.getGadgetByCategory(category);
    }

    public List<Gadget> getGadgetByName(String name){
        return gadgetRepository.getGadgetByName(name);
    }
    public List<Gadget> getGadgetByPriceRange(Double minPrice, Double maxPrice){

        if (maxPrice>=minPrice){
            return gadgetRepository.getGadgetByPrice(minPrice,maxPrice);
        }
        else
            return null;

    }

    public List<Gadget> getGadgetsByAvailability(Boolean availability){
        return gadgetRepository.getGadgetByAvailability(availability);
    }
    public Optional<Gadget>getGadgetById(Integer gadgetId){
        return gadgetRepository.getGadgetById(gadgetId);
    }

    public Gadget insertGadget(Gadget gadget){
        Optional<Gadget> tempGadget = gadgetRepository.getGadgetById(gadget.getId());
        if (tempGadget.isPresent())
            return gadget;
        if (gadget.getPrice()>=0 && gadget.getQuantity()>=0){
            return gadgetRepository.save(gadget);
        }
        else
            return gadget;
    }

    public  Gadget updateGadget(Gadget gadget){
        Optional<Gadget> tempGadget = gadgetRepository.getGadgetById(gadget.getId());
        if (tempGadget.isPresent()) {
            if (gadget.getPrice() >= 0 && gadget.getQuantity() >= 0) {
                if (gadget.getCategory()!=null)
                        tempGadget.get().setCategory(gadget.getCategory());
                if(gadget.getDescription()!= null)
                        tempGadget.get().setDescription(gadget.getDescription());
                if (gadget.getPrice()!=null)
                        tempGadget.get().setPrice(gadget.getPrice());
                if (gadget.getAvailability()!=null)
                        tempGadget.get().setAvailability(gadget.getAvailability());
                if (gadget.getQuantity()!=null)
                        tempGadget.get().setQuantity(gadget.getQuantity());
                if (gadget.getPhotography()!=null)
                        tempGadget.get().setPhotography(gadget.getPhotography());
                return gadgetRepository.save(tempGadget.get());
            }
            else
                return gadget;
        }
        else
            return gadget;
    }

    public void deleteGadget(Integer gadgetId){
        Optional<Gadget> tempGadget= gadgetRepository.findById(gadgetId);

        if (tempGadget.isPresent())
            gadgetRepository.delete(tempGadget.get());
        // TODO add exception
    }
}
