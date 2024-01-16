// Yêu cầu: Dựa vào mảng phía dưới, yêu cầu viết một hàm sử dụng arrow function và
// giá trị trả về sẽ là tổng các phần tử trong mảng.
// var arr = [1,2,3,4,5,6,7]
// console.log(arr) // Kết quả mong muốn 28

let tinhTong = (mang) => {
    // return mang.reduce((tong, giaTriHienTai) => tong + giaTriHienTai, 0);
    let tong = 0;
    for (let i = 0; i < mang.length; i++) {
        tong += mang[i];
    }
    return tong;
};

let mang = [1, 2, 3, 4, 5, 6, 7];
console.log(tinhTong(mang)); // Kết quả mong muốn: 28