const URL_BASE="http://localhost:8080";
let user = null

function getUserByEmail(email) {
    $.ajax({
        url: URL_BASE+"/api/user/emailexist/"+email,
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
                        cellphone:cellphone,
                        email:email,
                        zone:zone,
                        type:type,
                        password: password
                    };

                let body = JSON.stringify(user);
                console.log(body)
                $.ajax({
                            url:URL_BASE+"/api/user/new",
                            type:"POST",
                            datatype:"JSON",
                            data:body,
                            contentType:"application/json;charset=UTF-8"
                        })
                        .done(function(response){
                               console.log(response)
                               if(response)
                                    alert("Cuenta creada de forma correcta")
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


function validateLogin() {
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;
    console.log(email)
    console.log(password)

    if (emailValidation(email)) {

         $.ajax({
                url: URL_BASE + "/api/user/"+email+"/"+password,
                type:"GET",
                datatype:"JSON"
            })
            .done(function(response){
                console.log(response)
                if(response)
                    alert("Usuario con ingreso correcto")
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