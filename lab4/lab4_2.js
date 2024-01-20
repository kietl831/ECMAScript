// Bài 2
// Giải thích điểm khác nhau giữa đoạn code 1 và 2

const axios = require('axios');
// 1.
async function fetchUrls(urls) {
    const results = [];
    for (const url of urls) {
        const res = await axios.get(url);
        results.push(res);
        return results;
    }
}
// 2.
async function fetchUrlsParallel(urls) {
    const results = await Promise.all(
        urls.map(function (url) {
            return axios.get(url);
        })
        
    );
    return results;
}

// Đoạn code 1 lấy dữ liệu từ các URL theo thứ tự (sequential), 
// trong khi đoạn code 2 lấy dữ liệu từ các URL đồng thời (parallel).

// Đoạn code 1 chỉ trả về kết quả của URL đầu tiên, 
// trong khi đoạn code 2 trả về mảng kết quả từ tất cả các URL.
    