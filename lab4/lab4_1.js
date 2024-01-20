// Bài 1
// Chạy đoạn code đoạn code dưới đây và trả lời kết quả là gì?
let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
// hiển thị số 1 trong hộp thoại alert.