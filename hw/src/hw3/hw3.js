var rs = require('readline-sync');

var fNum1 = rs.question('1st Number: ');    // factorial
var fNum2 = rs.question('2nd Number: ');    // digits added together
var fNum3 = rs.question('3rd Number: ');    // reverse
var fNum4 = rs.question('4th Number: ');    // palindrome

var fact1 = factorial(parseInt(fNum1));
var sum2 = summer(fNum2);
var back3 = reverse(fNum3);
var pal4 = palindrome(fNum4);

console.log("Factorial of the 1st number is = " + fact1);
console.log("The sum of all digits of the 2nd is = " + sum2);
console.log("The reverse of the 3rd number is = " + back3);
console.log("Is the 4th number a palindrome (True/False)? = " + pal4);

function factorial(x) {
    if (x === 0) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}

function summer(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum = sum + parseInt(x.charAt(i));
    }
    return sum;
}

function reverse(x) {
    var backwards = "";
    for (var i = 1; i <= x.length; i++) {
        backwards = backwards + x.charAt(x.length - i);
    }
    return backwards;
}

function palindrome(x) {
    for (var i = 0; i < x.length / 2; i++) {
        if (x.charAt(i) != x.charAt(x.length - i - 1)) {
            return false;
        }
    }
    return true;
}