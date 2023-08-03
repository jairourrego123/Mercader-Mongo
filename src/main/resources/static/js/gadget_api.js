const URL_BASE="http://localhost:8080/api/gadget";
let gadget = null

$(document).ready( function(){
    closeModal();
    getAllGadgets();


})

function openModal(idGadget){

    if(idGadget==-1){

        $("#modalTitle").html("Nuevo Producto")
        $("#btnAddProduct").show();
        $("#btnUpdateProduct").hide();
        $("#numberProductId").val(""),
        $("#numberProductId").prop("disabled",false),
        $("#textBrand").val(""),
        $("#txtCategory").val(""),
        $("#txtNameProduct").val(""),
        $("#txtDescription").val(""),
        $("#numberPrice").val(""),
        $("#txtAvailability").val(""),
        $("#numberQuantity").val(""),
        $("#textPhotography").val("")

    }
    else {

           $("#modalTitle").html("Actualizar Producto")
           getGadget(idGadget)

           $("#btnAddProduct").hide();
           $("#btnUpdateProduct").show();
           $("#numberProductId").val(gadget.id),
           $("#numberProductId").prop("disabled",true),
           $("#textBrand").val(gadget.brand),
           $("#txtCategory").val(gadget.category),
           $("#txtNameProduct").val(gadget.name),
           $("#txtDescription").val(gadget.description),
           $("#numberPrice").val(gadget.price),
           $("#txtAvailability").val(gadget.availability),
           $("#numberQuantity").val(gadget.quantity),
           $("#textPhotography").val(gadget.photography)
    }
    $("#modalProducts").show();

}
function closeModal(){
    $("#modalProducts").hide();
}
function updateTableGadget(gadget){
    $("#tableGadget").find("tr:gt(0)").remove(); // modifica despues de la primera fila
    let data = ""
    for (let i = 0;i<gadget.length;i++){
    data += "<tr>"
    data += "<td>"+ gadget[i].id+"</td>"
    data += "<td>"+ gadget[i].brand+"</td>"
    data += "<td>"+ gadget[i].category +"</td>"
    data += "<td>"+ gadget[i].name +"</td>"
    data += "<td>"+ gadget[i].description +"</td>"
    data += "<td>"+ gadget[i].price+"</td>"
    data += "<td>"+ gadget[i].availability+"</td>"
    data += "<td>"+ gadget[i].quantity+"</td>"
    data += "<td>"+ gadget[i].photography+"</td>"
    data += "<td onclick=\"openModal("+gadget[i].id+")\">Actualizar</td>"
    data += "<td onclick=\"deleteGadget("+gadget[i].id+")\">Eliminar</td>"
    data += "</tr>"
    }
    $("#tableGadget > tbody:last-child").append(data);
    console.log(data)
}
function getGadget(idGadget){
    $.ajax({
        url: URL_BASE + "/"+idGadget,
        type : "GET",
        datatype : "JSON",
        async:false

    })
    .done(function(response){
        console.log(response)
        gadget=response;
        console.log(gadget)

    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in getGadget. "+ textStatus);
        alert("Hemos obtenido una falla obteniedo la informacion del producto. Por favor intente mastarde.")

    })
}
function getAllGadgets(){
    $.ajax({
        url: URL_BASE + "/all",
        type:"GET",
        datatype:"JSON"
    })
    .done(function(response){
        console.log(response)
        updateTableGadget(response)
    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in getAllGadgets. " + textStatus)
        alert("No se ha podido cargar los gadgets")
    })

}

function insertGadget(){
    gadget = {
        id : $("#numberProductId").val(),
         brand :$("#textBrand").val(),
         category : $("#txtCategory").val(),
         name : $("#txtNameProduct").val(),
         description : $("#txtDescription").val(),
         price : $("#numberPrice").val(),
         availability : $("#txtAvailability").val(),
         quantity : $("#numberQuantity").val(),
         photography : $("#textPhotography").val()

    }

    let body = JSON.stringify(gadget)
    console.log(body);

    $.ajax({

        url: URL_BASE + "/new",
        type: "POST",
        datatype: "JSON",
        data : body,
        contentType: "application/json; charset-UTF-8"
    })
    .done(function(response){
        console.log(response)
        if(response){
            alert("Producto creado correctamente.")
            getAllGadgets();
            closeModal();}
        else
            alert("No se ha podido crear el producto")
    })

    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error en insertGadgets. " + textStatus)
        alert("No se ha podido crear el producto. "+ textStatus)

    })
}

function updateGadget(){
 gadget = {
         id : $("#numberProductId").val(),
         brand :$("#textBrand").val(),
         category : $("#txtCategory").val(),
         name : $("#txtNameProduct").val(),
         description : $("#txtDescription").val(),
         price : $("#numberPrice").val(),
         availability : $("#txtAvailability").val(),
         quantity : $("#numberQuantity").val(),
         photography : $("#textPhotography").val()

    }

    let body = JSON.stringify(gadget)
    console.log(body);

    $.ajax({

        url: URL_BASE + "/update",
        type: "PUT",
        datatype: "JSON",
        data : body,
        contentType: "application/json; charset-UTF-8"
    })
    .done(function(response){
        console.log(response)
        if(response){
            alert("Producto modificado correctamente.")
            getAllGadgets();
            closeModal();}
        else
            alert("No se ha podido modificar el producto")
    })

    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error en updateGadget. " + textStatus)
        alert("No se ha podido modificar el producto. "+ textStatus)

    })

}

function deleteGadget(idGadget){

   $.ajax({

        url:URL_BASE + "/"+idGadget,
        type: "DELETE",
        datatype: "JSON"

   })

   .done(function(response){

    console.log(response)
    getAllGadgets();
    alert("Producto Eliminado Correctamente")


   })
   .fail(function(jqXHR,textStatus,errorThrown){
    console.log("Error in deleteGadget. "+ textStatus )
    alert("No se ha podido eliminar este producto. Por favor intente mas tarde.")
   })
}