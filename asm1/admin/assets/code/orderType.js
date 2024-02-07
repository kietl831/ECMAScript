// const API_URL = 'http://localhost:3000/';
// const products = 'products/';
// const orderDetails = 'order_details/';
// const orders = 'orders/';

const API_URL = 'http://localhost:3000/';
const productsEndpoint = 'products/';
const orderDetailsEndpoint = 'order_details/';
const ordersEndpoint = 'orders/';

const createOrderDiv = (order) => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('row', 'bg-white', 'align-items-center', 'border', 'rounded', 'm-4');
    orderDiv.id = `order-${order.id}`; // Tạo ID duy nhất cho div dựa trên id của đơn hàng

    orderDiv.innerHTML = `
        <div class="col-md-5">
            <div class="container mt-4">
                <div class="">
                    <a href="#" data-toggle="modal" data-target="#productModal">
                        <img class="img-fluid flex-shrink-0 rounded" width="150px" src="../images/products/${order.product_image}"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-md-7 align-items-center">
            <div class="">
                <div class="product-price mt-5">
                    <h5 class="">Tên Khách Hàng: ${order.customer_name}</h5>
                    <small>
                        <div class="">
                            <p><b>Tên Sản Phẩm: ${order.product_name}</b></p>
                            <p>
                                <b>Tổng Giá tiền:</b> ${order.total_price} VNĐ<br>
                                <b>Số lượng sản Phẩm:</b> ${order.quantity} <br>
                            </p>
                            <p>
                                <b>Số Điện Thoại:</b> ${order.phone_number} <br>
                                <b>Email:</b> ${order.email} 
                            </p>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <p><b>Đặt Vào Lúc:</b> ${order.order_time}</p>
                            <p><b>Địa chỉ:</b> ${order.address}</p>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    `;

    return orderDiv;
};


const showOrderType = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id');

        // Lấy thông tin đơn hàng từ id
        const orderResponse = await axios.get(`${API_URL}${ordersEndpoint}${orderId}`);
        const order = orderResponse.data;

        // Lấy thông tin chi tiết đơn hàng từ id
        const orderDetailsResponse = await axios.get(`${API_URL}${orderDetailsEndpoint}?order_id=${orderId}`);
        const orderDetails = orderDetailsResponse.data;

        // Hiển thị thông tin đơn hàng
        console.log('Thông tin đơn hàng:');
        console.log(order);

        // Hiển thị thông tin sản phẩm từ order_details và products
        console.log('Thông tin sản phẩm:');
        console.log(orderDetails); // Thêm dòng này để kiểm tra dữ liệu 'orderDetails'

        const ordersContainer = document.getElementById('ordersContainer');

        // Mảng chứa các promise của việc lấy thông tin sản phẩm từ orderDetails
        const productPromises = orderDetails.map(async (orderDetail) => {
            const productId = orderDetail.product_id;

            // Lấy thông tin sản phẩm từ id
            const productResponse = await axios.get(`${API_URL}${productsEndpoint}${productId}`);
            const product = productResponse.data;

            // Tạo div HTML cho đơn hàng và điền thông tin
            const orderDiv = createOrderDiv({
                customer_name: order.customer_name,
                product_name: product.name,
                total_price: orderDetail.unit_price * orderDetail.quantity,
                quantity: orderDetail.quantity,
                phone_number: order.customer_phone_number,
                email: order.customer_email,
                order_time: order.created_date,
                address: order.customer_address,
                product_image: product.image
            });

            return orderDiv;
        });

        // Đợi cho tất cả các promise hoàn thành trước khi thêm các div vào container
        const orderDivs = await Promise.all(productPromises);
        orderDivs.forEach(orderDiv => ordersContainer.appendChild(orderDiv));
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
};



showOrderType();







