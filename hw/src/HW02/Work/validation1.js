function validate1() {
    var firstNameCheck = alphaNumCheck(document.forms["validationForm"]["firstName"].value);
    var lastNameCheck = alphaNumCheck(document.forms["validationForm"]["lastName"].value);
    var genderCheck = document.forms["validationForm"]["gender"].value != "select";
    var stateCheck = document.forms["validationForm"]["state"].value != "select";

    var valcheck = firstNameCheck && lastNameCheck && stateCheck && genderCheck;

    var firstImage = getImage(Boolean(firstNameCheck), "firstName");
    var lastImage = getImage(Boolean(lastNameCheck), "lastName");
    var genderImage = getImage(Boolean(genderCheck), "gender");
    var stateImage = getImage(Boolean(stateCheck), "state");

    document.getElementById("FirstName").appendChild(firstImage);
    document.getElementById("LastName").appendChild(lastImage);
    document.getElementById("Gender").appendChild(genderImage);
    document.getElementById("State").appendChild(stateImage);

    document.getElementById("FirstName").append(getNotification(Boolean(firstNameCheck), "firstName"));
    document.getElementById("LastName").append(getNotification(Boolean(lastNameCheck), "lastName"));
    document.getElementById("Gender").append(getNotification(Boolean(genderCheck), "gender"));
    document.getElementById("State").append(getNotification(Boolean(stateCheck), "state"));

    if (valcheck) {
        window.location.assign("validation2.html");
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

function getNotification(bool, ID) {
    var label = document.getElementById("labelNotify" + ID);
    if (label == null) {
        label = document.createElement("LABEL");
        label.id = "labelNotify" + ID;
        // label.className = "errorMessage";
        label.setAttribute('class', 'errorMessage');
    }
    
    if (ID == "firstName" || ID == "lastName") {
        label.innerHTML = bool ? "" : "Must contain only alphabetic or numeric characters";
    } else if (ID == "state" || ID == "gender") {
        label.innerHTML = bool ? "" : "Select from given list";
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