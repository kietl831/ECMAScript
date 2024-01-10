const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
};
function makeList(arr) {
//const failureItems = [];
// Thay đổi code ở đây  
const failureItems = arr.map(item => `<li class="text-warning">${item}</li>`);

return failureItems;
}
const failuresList = makeList(result. failure);

// hiển thị
const hien = document.getElementById('hien');
// Chuyển danh sách thành chuỗi HTML và chèn vào phần tử UL
hien.innerHTML = failuresList.join('');
// Sử dụng cú pháp template string hiển thị ra danh sách các phần tử (li) như sau:
[
    '<li class="text-warning">no-var</li>',
    '<li class="text-warning">var-on-top</li>',
    '<li class="text-warning">linebreak</li>'
]

