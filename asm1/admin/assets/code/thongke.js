const API_URL = 'http://localhost:3000/';
const order_details = "order_details/";



const hienThiThongKe = function(hienThi){
    return `
    
        
            <div class="app-card app-card-stat shadow-sm h-100">
                 <div class="app-card-body p-3 p-lg-4">
                     <h4 class="stats-type mb-1">Sản Phẩm Được Đặt Mua</h4>
                     <div class="stats-figure">${hienThi}</div>
                     <div class="stats-meta text-success">
                         
                     </div>
                 </div>
                <a class="app-card-link-mask" href="#"></a>
             </div><!--//app-card-->
         
    
    `;
};

const hienThiThongKeDanhThu = function(hienThiDanhThu){
    return `
    
        
            <div class="app-card app-card-stat shadow-sm h-100">
                 <div class="app-card-body p-3 p-lg-4">
                     <h4 class="stats-type mb-1">Tổng Danh Thu VNĐ</h4>
                     <div class="stats-figure">${hienThiDanhThu}</div>
                     <div class="stats-meta text-success">
                         
                     </div>
                 </div>
                <a class="app-card-link-mask" href="#"></a>
             </div><!--//app-card-->
        
    
    `;
};

// Hàm thực hiện yêu cầu lấy dữ liệu từ API

const thongKe = async () => {
    try {
        // Gửi yêu cầu GET đến API để lấy chi tiết đơn hàng
        const response = await axios.get(API_URL + order_details);
        console.log(response.data); // Ghi dữ liệu nhận được vào console
        return response.data; // Trả về dữ liệu cho hàm gọi
    } catch (error) {
        console.error('lỗi', error); // Ghi lỗi vào console nếu có lỗi xảy ra
        return null; // Trả về null nếu có lỗi
    }
};

// Hàm tính toán số lượng sản phẩm được đặt mua cho mỗi sản phẩm
const tinhSoLuong = (orderDetails) => {
    const productQuantityMap = {};

    // Duyệt qua từng chi tiết đơn hàng và tính toán tổng số lượng sản phẩm
    orderDetails.forEach(detail => {
        const { product_id, quantity } = detail;
        if (productQuantityMap[product_id]) {
            productQuantityMap[product_id] += quantity;
        } else {
            productQuantityMap[product_id] = quantity;
        }
    });

    return productQuantityMap; // Trả về đối tượng có key là product_id và value là tổng số lượng sản phẩm
};

// tính Tổng Danh Thu
const tinhDoanhThu = (orderDetails) => {
    let tongDanhThu = 0;

    // Duyệt qua từng chi tiết đơn hàng và tính tổng doanh thu
    orderDetails.forEach(detail => {
        tongDanhThu += detail.quantity * detail.unit_price;
    });

    return tongDanhThu; // Trả về tổng doanh thu
};


// Thực hiện chức năng thống kê
const thucHien = async () => {
    try {
        // Lấy dữ liệu chi tiết đơn hàng từ API
        const orderDetails = await thongKe();

        if (orderDetails) {
            // Tính tổng số lượng sản phẩm được đặt mua từ danh sách chi tiết đơn hàng
            const totalQuantity = orderDetails.reduce((total, detail) => total + detail.quantity, 0);

            // Tính tổng doanh thu từ danh sách chi tiết đơn hàng
            const totalRevenue = tinhDoanhThu(orderDetails);

            // Hiển thị tổng số lượng sản phẩm được đặt mua lên trang HTML
            const thongKeHtml = hienThiThongKe(totalQuantity);
            document.getElementById('thong-ke-container').innerHTML = thongKeHtml;

            // Hiển thị tổng doanh thu lên trang HTML bằng hàm mới
            const danhThuHtml = hienThiThongKeDanhThu(totalRevenue);
            document.getElementById('danh-thu-container').innerHTML = danhThuHtml;
        } else {
            console.log('Lỗi');
        }
    } catch (error) {
        console.error('Lỗi:', error); // Ghi lỗi vào console nếu có lỗi xảy ra trong quá trình thực thi
    }
}; 


// Gọi hàm chính để thực thi chương trình
thucHien();
