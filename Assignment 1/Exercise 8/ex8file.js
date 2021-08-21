

/* Usage of Constraint Validation API */



/* Έλεγχος εγκυρότητας του username */

function checkUsername(){
    const user = document.getElementById("usernameInput");
    user.setCustomValidity('');
    if (user.value == ""){
        user.setCustomValidity("Please enter a username");
    }
    if (!user.checkValidity() && user.value != ""){
        user.setCustomValidity("username must contain at least one upper case character, one lower case character and/or a number.");
    }
}

/* Έλεγχος εγκυρότητας κωδικού */

function checkPassword(){
    const psw = document.getElementById("pswInput");
    psw.setCustomValidity('');
    if (psw.value == ""){
        psw.setCustomValidity("Please enter a password");
    }
    else if (!psw.checkValidity() && psw.value != ""){
        psw.setCustomValidity("Password must contain at least one upper case character, one lower case character , a number and must be 8 characters long.");
    }
}

/* Διπλός έλεγχος κωδικού */

function matchPassword(){
    const pw1 = document.getElementById("pswInput");
    const pw2 = document.getElementById("conPsw");
    pw2.setCustomValidity('');
    if (pw1.value != pw2.value){
        pw2.setCustomValidity("The passwords don't match.");
    }
}

/* Έλεγχος εγκυρότητας email */

function checkEmail(){
    const email = document.getElementById("emailInput");
    email.setCustomValidity('');
    if (email.value == ""){
        email.setCustomValidity("Please enter your email");
    }
    else if (!email.checkValidity() && email.value != ""){
        email.setCustomValidity("Possible email typo. Retype your email please.");
    }
}


/* Έλεγχος τηλεφωνικού αριθμού */

function checkPhoneNumber(){
    const phone = document.getElementById("tele");
    phone.setCustomValidity('');
    if (!phone.checkValidity()){
        phone.setCustomValidity("Phone number must have numbers ONLY.");
    }else if (phone.value.length != 10){
        phone.setCustomValidity("Phone number must have 10 digits ONLY.");
    }
}
