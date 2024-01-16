// Bài 3
// Yêu cầu: Viết lại mã lệnh Javascript phía dưới, sử dụng arrow function
var Entity = function (name, delay) { // không thể dùng this với cách arrow function
    this.name = name;
    this.delay = delay;
}

Entity.prototype.greet = function () { // không thể dùng this với cách arrow function
    setTimeout(() => {
        console.log('Xin chào, tên tôi là ', this.name);
    }, this.delay);
}

var java = new Entity('Java', 5000);
var cpp = new Entity('C++', 30);

java.greet();
cpp.greet();
