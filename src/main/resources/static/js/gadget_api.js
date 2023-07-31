const URL_BASE="http://localhost:8080/api/gadget";
let gadget = null

$(document).ready( function(){
    closeModal();
    getAllGadgets();


})

function openModal(idGadget){

    if(idGadget==-1){
        $("modal-title").html("Nuevo Producto")
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
            $("modal-title").html("Actualizar Producto")
           $("#btnAddProduct").hide();
           $("#btnUpdateProduct").show();
           $("#numberProductId").val(""),
           $("#numberProductId").prop("disabled",true),
           $("#textBrand").val(""),
           $("#txtCategory").val(""),
           $("#txtNameProduct").val(""),
           $("#txtDescription").val(""),
           $("#numberPrice").val(""),
           $("#txtAvailability").val(""),
           $("#numberQuantity").val(""),
           $("#textPhotography").val("")
    }
    $("#modalProducts").show();

}
function closeModal(){
    $("#modalProducts").hide();
}
function updateTableGadget(gadget){
    $("#tableGadet").find("tr:gt(0)").remove(); // modifica despues de la primera fila
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
    data += "<td>Actualizar</td>"
    data += "<td>Delete</td>"
    data += "</tr>"
    }
    $("#tableGadget > tbody:last-child").append(data);
    console.log(data)
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

function createGadgets(){
    gadget = {
        id : $("#numberProductId").val(""),
         brand :$("#textBrand").val(""),
         category : $("#txtCategory").val(""),
         name : $("#txtNameProduct").val(""),
         description : $("#txtDescription").val(""),
         price : $("#numberPrice").val(""),
         availability : $("#txtAvailability").val(""),
         quantity : $("#numberQuantity").val(""),
         photography : $("#textPhotography").val("")

    }

    let body = JSON.stringify(gadget)
    console.log(data);

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
            getAllGadgets()}
        else
            alert("No se ha podido crear el producto")
    })

    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error en createGadgets. " + textStatus)
        alert("No se ha podido crear el producto. "+ textStatus)

    })
}