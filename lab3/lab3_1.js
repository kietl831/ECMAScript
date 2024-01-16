// Bài 1
// Yêu cầu: Sử dụng cú pháp arrow function để viết ngắn lại các đoạn mã javascript theo
// hình
const multiply = (num1, num2) => num1 * num2;
console.log(multiply(2,2));

const toCelsius = (fahrenheit) => (5 / 9) * (fahrenheit - 32);
console.log(toCelsius(100));

const padZeros = (num, totallen) => {
    let numStr = num.toString();
    let numZeros = totallen - numStr.length;
    for (let i = 1; i <= numZeros; i++) {
        numStr = "0" + numStr;
    }
    return numStr;
};
console.log(padZeros(42,6));

const power = (base, exponent) => {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result = base;
    }
    return result;
};
console.log(power(2, 4));

const greet = (who) => console.log("Hello " + who);
console.log(greet("Kiệt"));