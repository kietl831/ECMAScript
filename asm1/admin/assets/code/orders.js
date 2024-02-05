const API_URL = 'http://localhost:3000/';
const orders = 'orders/';

const layOutOrders = (data) => {
    let stt = 1;
    return data.map(order => {
        let statusText = '';
        let mau = '';
        if(order.status === "1") {
            statusText = `Đặt Hàng Hàng Công`;
            mau = `success`;
        } else if(order.status === "2") {
            statusText = `Đang Xử Lý`;
            mau = `warning`;
        } else {
            statusText = `Đơn Hàng Đã Hủy`;
            mau = `danger`
        }
        return `
        <tr>
            <td class="cell">${stt++}</td>
            <td class="cell"><span class="truncate">${order.customer_name}</span></td>
            <td class="cell">${order.created_date}</td>
            <td class="cell"><span class="badge bg-${mau}">${statusText}</span></td> 
            <td class="cell">
                <select class="orderStatusSelect" data-order-id="${order.id}">
                    <option value=""></option>
                    <option value="2">Đang Chờ Xử lý</option>
                    <option value="1">Thành Công</option>
                    <option value="3">Hủy Đơn Hàng</option>  
                </select>
            </td>
            <td class="cell">
                <a class="btn-sm app-btn-secondary" href="./orderDetails.html?id=${order.id}">Xem</a>
            </td>
        </tr>
        `;
    }).join('');
};

const showOrders = (endpoint) => {
    // Gửi yêu cầu GET đến API để lấy danh sách đơn hàng
    axios.get(API_URL + endpoint)
        .then(response => {
            // Gọi hàm layOutOrders để tạo HTML cho danh sách đơn hàng từ dữ liệu trả về
            const showOrders = layOutOrders(response.data);
            
            // Hiển thị danh sách đơn hàng trên giao diện
            document.getElementById('showOrders').innerHTML = showOrders;

            // Lắng nghe sự kiện thay đổi trạng thái đơn hàng từ dropdown menu
            document.querySelectorAll('.orderStatusSelect').forEach(select => {
                select.addEventListener('change', function() {
                    // Lấy ID của đơn hàng và trạng thái mới từ dropdown menu
                    const orderId = this.dataset.orderId;
                    const newStatus = this.value;

                    // Gọi hàm updateOrderStatus để cập nhật trạng thái của đơn hàng thông qua yêu cầu PATCH đến API
                    updateOrderStatus(orderId, newStatus);
                });
            });
        })
        .catch(error => {
            console.error('Có vấn đề khi thực hiện yêu cầu Axios:', error);
        });
};

const updateOrderStatus = (orderId, newStatus) => {
    // Gửi yêu cầu PATCH để cập nhật trạng thái của đơn hàng
    axios.patch(API_URL + orders + orderId, { status: newStatus })
    .then(response => {
        console.log(`Trạng thái của đơn hàng ${orderId} được cập nhật thành công.`);
        // Bạn có thể muốn cập nhật giao diện người dùng để phản ánh sự thay đổi trong trạng thái
    })
    .catch(error => {
        console.error('Có vấn đề khi thực hiện yêu cầu Axios:', error);
    });
};

showOrders(orders);
