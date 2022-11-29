const { odd, even } = require('./var');
const abc = require('./func');

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(abc(10));
console.log(checkStringOddOrEven('hello'));