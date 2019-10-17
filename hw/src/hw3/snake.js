var Snake = {

    Model : {
        oldVal : undefined
    },

    View: {
        stopButton : {id: "stop", type: "button", value: "Stop", onclick: ""},
        leftButton : {id: "left", type: "button", value: "Left", onclick: ""},
        rightButton : {id: "right", type: "button", value: "Right", onclick: ""},
    },

    Controller: {

    },

    run : function() {
        console.log(Snake.displayAll());
        return Snake.displayAll();
    },

    displayAll : function() {
        var s;
        s = "<div>";
        s += Snake.displayElement(Snake.View.stopButton);
        s += Snake.displayElement(Snake.View.leftButton);
        s += Snake.displayElement(Snake.View.rightButton);
        s += "</div><div>";
        s += "<canvas id=\"gameSpace\" width=\"300\" height=\"300\" style=\"border:1px solid #000000;\"></canvas>";
        s += "</div>";
        return s;
    },

    displayElement : function (element) {
        var s = "<input ";
        s += " id=\"" + element.id + "\"";
        s += " type=\"" + element.type + "\"";
        s += " value= \"" + element.value + "\"";
        s += " onclick= \"" + element.onclick + "\"";
        s += ">";
        return s;
    },

}