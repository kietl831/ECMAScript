// Bài 3
// Sử dụng async await kết hợp với Promise để viết lại đoạn code dưới.
const fs = require('fs').promises;
const axios = require('axios');
// thư viện giúp xử lý đường dẫn 
const path = require('path');
// Xử lý cho nó chọn đến data.json trong file lab4
const filePath = path.join(__dirname, 'data.json')

async function fetchData() {
    try {
        // Đọc dữ liệu từ file
        const fileData = await fs.readFile(filePath, { encoding: 'utf8' });
        console.log('Dữ liệu được tải từ ổ đĩa', fileData);

        // Gửi yêu cầu lấy dữ liệu từ URL
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        console.log('Dữ liệu được tải từ URL', response.data);
    } catch (error) {
        console.error('Lỗi', error.message);
    }
}

// Gọi hàm fetchData để thực thi
fetchData();

// fs.readFile(
//     './data.json',
//     { encoding: 'utf8' },
//     function (err, data) {
//         console.log('Data loaded from disk', data);
//         axios.get('https://jsonplaceholder.typicode.com/todos/1')
//             .then(function (res) {
//             });
//         console.log('Data downloaded from url', res.data);
//     }
// );