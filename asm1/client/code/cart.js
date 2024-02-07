const API_URL = "http://localhost:3000/"; // URL của API
const productsEndpoint = "products/"; // Đường dẫn đến endpoint products trong API


// Hàm hiển thị thông tin sản phẩm trong giỏ hàng dưới dạng HTML
let hienThiCart = function(cart){
    const currentDate = new Date().toLocaleDateString();
    return `
    <tr>
        <input type="hidden" name="productId" value="${cart.id}"> 
        <td><img src="./images/${cart.image}" width="50px" class="img-fluid rounded" alt=""></td> 
        <td>${cart.name}</td> 
        <td>${currentDate}</td> 
        <td><span>${cart.price * cart.quantity}</span> VNĐ <input type="hidden" class="don_gia_an" value="${cart.price}"></td> 
        <td><input type="number" value="${cart.quantity}" min="1" max="5" style="background: none; border: none;" onchange="updateCartItem(${cart.id}, this.value, ${cart.price})"></td> 
        <td class="pt-1 m-auto"><a onclick="removeFromCart(${cart.id})" class="btn btn-outline-danger">Xóa</a></td> 
    </tr>
`;
}

// Hàm hiển thị thông báo khi không có sản phẩm trong giỏ hàng
let hienThiNull = function(){
    const nullContent = `
    <div class="row  m-1 pb-5">
        <h6 class="col-12">Không tồn tại sản phẩm nào trong giỏ hàng </h6>
        <a class="btn btn-outline-dark col-12" href="./index.html"> Về trang chủ</a>
    </div>
    `;
    
    // Hiển thị nội dung trong div có id là "hienThiNull"
    const hienThiNullDiv = document.getElementById('hienThiNull');
    if (hienThiNullDiv) {
        hienThiNullDiv.innerHTML = nullContent;
    } else {
        console.error('Không tìm thấy phần tử có id là "hienThiNull"');
    }
}

// Phương thức để cập nhật số lượng và tổng giá trị của sản phẩm trong giỏ hàng
function updateCartItem(productId, quantity, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy danh sách giỏ hàng từ localStorage
    let updatedCart = cart.map(item => {
        if (item.id === productId) {
            item.quantity = quantity;
            item.totalPrice = price * quantity; // Cập nhật tổng giá trị dựa trên số lượng mới và đơn giá mới
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Lưu danh sách giỏ hàng mới vào localStorage
}


class AddCart {
constructor() {
    // Khởi tạo mảng giỏ hàng nếu không tồn tại trong localStorage
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Phương thức để lấy danh sách sản phẩm từ API
async fetchProducts() {
    try {
        const response = await axios.get(API_URL + productsEndpoint);
        return response.data; // Trả về danh sách sản phẩm từ API
        
    } catch (error) {
        console.error('Đã xảy ra lỗi khi tải dữ liệu sản phẩm:', error);
        return [];
    }
}

// Phương thức để thêm sản phẩm vào giỏ hàng
async addToCart(quantity) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            console.error('Không tìm thấy ID sản phẩm trong URL!');
            // Hiển thị thông báo không có sản phẩm và ngắt các chức năng
            hienThiNull();
            return;
        }

        const products = await this.fetchProducts(); // Lấy danh sách sản phẩm từ API

        // Kiểm tra xem dữ liệu products có tồn tại và không rỗng không
        if (!products || products.length === 0) {
            console.error('Dữ liệu sản phẩm trống!');
            return;
        }

        const product = products.find(prod => prod.id === parseInt(productId));

        if (!product) {
            console.error('Sản phẩm không tồn tại!');
            return;
        }

        // Tạo đối tượng sản phẩm mới để thêm vào giỏ hàng
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: parseInt(quantity),
            totalPrice: product.price * parseInt(quantity),
            image: product.image // Thêm thông tin hình ảnh của sản phẩm
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy danh sách giỏ hàng từ localStorage

        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += parseInt(quantity);
            cart[existingItemIndex].totalPrice = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
            updateCartItem(product.id, cart[existingItemIndex].quantity, cart[existingItemIndex].price); // Cập nhật số lượng và tổng giá trị sản phẩm trong giỏ hàng
        } else {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart)); // Lưu danh sách giỏ hàng mới vào localStorage
        }

        console.log('Sản phẩm đã được thêm vào giỏ hàng:');
        console.log(item);
        
        // Hiển thị sản phẩm vừa thêm vào giỏ hàng ra HTML
        const cartContainer = document.getElementById('cartContainer');
        const cartItemHTML = hienThiCart(item);
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    } catch (error) {
        console.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
}

}

// xóa khỏi giỏ hàng
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Lưu danh sách giỏ hàng mới vào localStorage

    // Xóa sản phẩm khỏi giao diện người dùng
    const cartItemToRemove = document.querySelector(`input[name="productId"][value="${productId}"]`).parentNode.parentNode;
    cartItemToRemove.parentNode.removeChild(cartItemToRemove);

    console.log('Sản phẩm đã được xóa khỏi giỏ hàng:', productId);
}

// Hàm để tính tổng số tiền của các sản phẩm hiện có trong giỏ hàng
function calculateTotalPrice() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice = item.totalPrice;
    });
    return totalPrice;
}

// Hàm để hiển thị tổng số tiền trong giỏ hàng
function displayTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = calculateTotalPrice(cart);
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${totalPrice}`;
    } else {
        console.error('Không tìm thấy phần tử có id là "totalPrice"');
    }
}

// Khởi tạo đối tượng giỏ hàng
const cart = new AddCart();

// Thêm sản phẩm vào giỏ hàng
cart.addToCart(1); // Thêm 2 sản phẩm có ID từ tham số truy vấn trong URL

displayTotalPrice();
