const URL_BASE="http://localhost:8080/api/user";
let user = null
$(document).ready(function(){

    getAllUsers();


    })

function getUserByEmail(email) {
    $.ajax({
        url: URL_BASE+"/emailexist/"+email,
        type:"GET",
        datatype:"JSON"
    })
    .done(function(response){
        console.log(response)
        return response
    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in getUserByEmail. " + textStatus )
        return true;
    })
};

function validateLogin() {
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;
    console.log(email)
    console.log(password)

    if (emailValidation(email)) {

         $.ajax({
                url: URL_BASE + "/"+email+"/"+password,
                type:"GET",
                datatype:"JSON"
            })
            .done(function(response){
                console.log(response)
                if(response){
                    alert("Usuario con ingreso correcto")
                    location.href ='/usuarios.html';}
                 else
                    alert("Usuario con ingreso incorrecto")
                //TODO redirect to profile
            })
            .fail(function(jqXHR,textStatus,errorThrown){
                console.log("Error en validateLogin. "+textStatus)
                 alert("No se ha podido Logeear, Verifique sus credenciales")
                 //TODO redirect
            })
        }

     else{
          alert("El formato Email no es valido")
     }
    
};

function updateTableUser(user){
     $("#tableUser").find("tr:gt(0)").remove(); // modifica despues de la primera fila
     let data = ""
    for(let i=0;i < user.length; i++){

        data += "<tr>"
        data += "<td>"+user[i].name+"</td>"
        data += "<td>"+user[i].identification + "</td>"
        data += "<td>"+user[i].address + "</td>"
        data += "<td>"+user[i].cellPhone + "</td>"
        data += "<td>"+user[i].email + "</td>"
        data += "<td>"+user[i].zone + "</td>"
        data += "<td>"+user[i].type + "</td>"
        data += "<td onclick=\"openModalUser("+user[i].id+")\">Actualizar</td>"
        data += "<td onclick=\"deleteUser("+user[i].id+")\">Eliminar</td>"
        data += "</tr>"
    }
     $("#tableUser > tbody:last-child").append(data);
    console.log(data)


}

function openModalUser(idUser){


    getUserId(idUser)
    $("#txtId").val(user.id)
    $("#txtIdentification").val(user.identification);
    $("#txtName").val(user.name);
    $("#txtAddress").val(user.address);
    $("#txtCellPhone").val(user.cellPhone);
    $("#txtEmail").val(user.email);
    $("#txtEmail").prop("disabled",true)
    $("#txtZone").val(user.zone);
    $("#cbxType").val(user.type);
    $("#modalUser").show();

}
function UpdateUser(idUser){

      if (!passwordValidation($("#txtPassword").val())){
        alert("La longitud de la contraseña debe ser mayor a 6 digitos")
        return false
        }
      if (!(newPasswordValidation($("#txtPassword").val(),$("#txtConfirmedPassword").val()))){
            alert("Las contraseñas no son iguales")
        return false}

      user = {
            id:user.id,
            identification:$("#txtIdentification").val(),
            name:$("#txtName").val(),
            address:$("#txtAddress").val(),
            cellPhone:$("#txtCellPhone").val(),
            email:$("#txtEmail").val(),
            zone: $("#txtZone").val(),
            type: $("#cbxType").val(),
            password : $("#txtPassword").val()

        }

    body = JSON.stringify(user)
    console.log(body);
    $.ajax({

        url: URL_BASE + "/update",
        type: "PUT",
        datatype: "JSON",
        data:body,
        contentType: "application/json;charset=UTF-8"
    })
    .done(function(response){
        console.log(response);
        getAllUsers();
        alert("Usuario Modificado");
        $("#modalUser").hide();

    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in UpdateUser." + textStatus);
        alert("No se ha podido actualizar la informacion del Usuario");

    })
}
function getUserId(idUser){
    $.ajax({

        url:URL_BASE + "/"+ idUser,
        type: "GET",
        datatype : "JSON",
        async: false

    })

    .done(function(response){

        console.log(response);
        user = response;
    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in getUserId ")
        alert("Hemos obtenido una falla obteniendo la informacion del Usuario. Por favor intente de nuevo mas tarde.")
    })

}
function getAllUsers(){
    $.ajax({

        url:URL_BASE + "/all",
        type: "GET",
        datatype: "JSON"

    })
    .done(function(response){
        console.log(response);
        updateTableUser(response)
    })
    .fail(function(jqXHR,textStatus,errorThrown){
        console.log("Error in getAllUsers. "+ textStatus );
        alert("No se han podido cargar los Usuarios.");
    })

}

function createUser() {
    let id = document.getElementById("txtId").value;
    let identification = document.getElementById("txtIdentification").value;
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let cellphone = document.getElementById("txtCellPhone").value;
    let email = document.getElementById("txtEmail").value;
    let zone = document.getElementById("txtZone").value;
    let type = document.getElementById("cbxType").value;
    let password = document.getElementById("txtPassword").value;
    let confirmedPassword = document.getElementById("txtConfirmedPassword").value;

    if (nameValidation(name)) {
        if (emailValidation(email)) {
            if (passwordValidation(password))
            if (newPasswordValidation(password,confirmedPassword) ) {
                if(!getUserByEmail(email)){
                    user ={
                        id:id,
                        identification:identification,
                        name:name,
                        address:address,
                        cellPhone:cellphone,
                        email:email,
                        zone:zone,
                        type:type,
                        password: password
                    };

                let body = JSON.stringify(user);
                console.log(body)
                $.ajax({
                            url:URL_BASE+"/new",
                            type:"POST",
                            datatype:"JSON",
                            data:body,
                            contentType:"application/json;charset=UTF-8"
                        })
                        .done(function(response){
                               console.log(response)
                               if(response){
                                    alert("Cuenta creada de forma correcta")
                                    location.href ='/login.html';}
                               else
                                     alert("No fue posible crear la cuenta ")
                        })
                        .fail(function(jqXHR,textStatus,errorThrown){
                            console.log("Error en createUser. "+textStatus)
                            alert("El registro del usuario ha fallado. Por favor, intente mastarde")
                        })
                  }
                  else{
                    alert("Ya existe un usuario registrado con el mismo email.Por favor utilizar un email diferente ")
                  }

            } else {
                alert("Las contraseñas no son iguales.Verifique de nuevo por favor ")
            }
            else {
                alert("La longitud de la contraseña es muy corta")
            }
        } else {
            alert("El email no tiene el formato correcto")
        }
    } else {
        alert("El nombre no tiene el formato correcto")
    }
    // TODO redirect to home
};

function deleteUser(idUser){

        $.ajax({
            url:URL_BASE + "/"+idUser,
            type : "DELETE",
            datatype : "JSON"
        })
        .done(function(response){
           console.log(response)
           getAllUsers()
           alert("Usuario eliminado correctamente")
        })
        .fail(function(jqXHR,textStatus,errorThrown){
            console.log("Error in deleteUser. " + textStatus);
            alert("No ha sido posible eliminar al usuario.Por favor intentelo mas tarde.")
        })
}