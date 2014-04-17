"use strict";


function AssertionsCounter(number, done) {
    if (! (this instanceof AssertionsCounter)) {
        throw new Error("This must be instance of AssertionsCounter");
    }

    function validateNumber(number) {
        if (isNaN(number)) {
            throw new Error("Provided value is not a number, given: " + number);
        }
        if (number < 1) {
            throw new Error("Provided value must be greater than 0, given: " + number);
        }
    }

    function validateFunction(functionToCheck) {
        var getType = {};
        var is = functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';

        if (! is) {
            throw new Error("Provided value must be a valid function, given: " + typeof functionToCheck);
        }
    }

    validateNumber(number);
    validateFunction(done);


    this.add = function (num) {
        num = num || 1;
        validateNumber(num);

        number -= num;

        if (number < 0) {
            throw new Error("Too many assertions called");
        } else if (0 === number) {
            done();
        }
    }
}


module.exports = AssertionsCounter;
