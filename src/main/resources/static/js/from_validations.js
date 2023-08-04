function nameValidation(name) {
    let pattern = /^([A-Z]|[a-z]*)+ ([A-Z]|[a-z]*)+/
    return pattern.test(name)
};

function emailValidation(email) {
    const pattern = /^[a-z][a-z.0-9]*@(usa.edu.co|gmail.com)/
    return pattern.test(email)
    
};
function phonesValidation(phone) {
    const pattern = /^[0-9+,.()]+$/
    return pattern.test(phone)

};

function passwordValidation(password){
    return password.length>=6?true:false;
}
function newPasswordValidation(password,confirmed_password) {

    if (password===confirmed_password) {
        return true;

    }
    else 
        return false;
    
};