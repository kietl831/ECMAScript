/*
Viết một arrow function có tên là convertTemperature, nhận vào hai tham số: temperature và unit.
temperature là một số nguyên hoặc số thập phân, và unit là một chuỗi biểu thị đơn vị nhiệt độ ("C" cho Celsius hoặc "F" cho Fahrenheit).

Hàm này sẽ quy đổi nhiệt độ từ đơn vị hiện tại sang đơn vị khác. Nếu unit là "C", hãy chuyển nhiệt độ sang Fahrenheit và ngược lại.

Công thức chuyển đổi là: Celsius sang Fahrenheit: (C * 9/5) + 32, ngược lại là Fahrenheit sang Celsius: (F - 32) * 5/9.


 */

let convertTemperature = (temperature, unit) => {
    if(unit === "C"){
        // Chuyển từ Celsius sang Fahrenheit
        return (temperature * 9/5) + 32;
    }
    else if(unit === "F"){
        // Chuyển từ Fahrenheit sang Celsius
        return  (temperature - 32) * 5/9;
    }else {
        // Trường hợp không hợp lệ, có thể xử lý hoặc trả về giá trị mặc định
        return "Đơn vị nhiệt độ không hợp lệ";
    }
};

console.log(convertTemperature(25, "C")); // (25 * 9/5) + 32 = 77
console.log(convertTemperature(77, "F")); // (77 - 32) * 5/9 = 25