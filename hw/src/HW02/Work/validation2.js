function validate2() {
    valCheck = true;
    var resultEmailCheck = emailCheck(document.forms["contact information"]["email"].value);
    var image1 = getImage(Boolean(resultEmailCheck), "email");
    var labelNotifyEmail1 = getNotification(Boolean(resultEmailCheck), "email");

    var resultPhoneCheck = phoneCheck(document.forms["contact information"]["phone"].value);
    var resultAddressCheck = addressCheck(document.forms["contact information"]["address"].value);
    
    document.getElementById("Email").appendChild(image1);
    document.getElementById("Email").appendChild(labelNotifyEmail1);

    document.getElementById("Phone").appendChild(getImage(Boolean(resultPhoneCheck), "phone"));
    document.getElementById("Phone").appendChild(getNotification(Boolean(resultPhoneCheck), "phone"));
    document.getElementById("Address").appendChild(getImage(Boolean(resultAddressCheck), "address"));
    document.getElementById("Address").appendChild(getNotification(Boolean(resultAddressCheck), "address"));
}

function getNotification(bool, ID) {
    var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        //label.className = "errorMessage";
        label.setAttribute('class', 'errorMessage');
    }

    if (ID == "email") {
        label.innerHTML = bool ? "" : "Email should be in form xxx@xxx.xxx, which x should be alphanumeric!";
    } else if (ID == "phone") {
        label.innerHTML = bool ? "" : "Must be in the form xxx-xxx-xxxx or xxxxxxxxxx. x should be numeric";
    } else {
        label.innerHTML = bool ? "" : "Must be in the form of city & state. example: Ames, IA"
    }

    return label;
}


function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function emailCheck(email) {
    atSplit = email.split('@');
    if (atSplit.length == 2 && alphaNumCheck(atSplit[0])) {
        periodSplit = atSplit[1].split('.')
        if (periodSplit.length == 2 && alphaNumCheck(periodSplit[0] + periodSplit[1])) {
            return true;
        }
    }
    valCheck = false;
    return false;
}

function phoneCheck(phone) {
    atSplit = phone.split('-');
    if (atSplit.length == 1 && numCheck(phone) && phone.length == 10) {
        return true;
    } else if (atSplit.length == 3 && numCheck(atSplit[0]) && numCheck(atSplit[1]) && numCheck(atSplit[2])) {
        return true
    } else {
        valCheck = false;
        return false;
    }
}

function addressCheck(address) {
    atSplit = address.split(', ');
    if (atSplit.length == 2 && alphaCheck(atSplit[0]) && alphaCheck(atSplit[1])) {
        return true;
    } else {
        valCheck = false;
        return false;
    }
} 


function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function numCheck(entry) {
    return entry.match(/^[0-9]+$/) != null;
}

function alphaCheck(entry) {
    return entry.match(/^[a-zA-Z]+$/) != null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
