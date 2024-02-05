const API_URL = 'http://localhost:3000/';
const SP = 'products/';

let layOutProduct = (data) => {
    let stt = 1;
    return data.map(product => {
        return `
        <tr>
            <td class="cell">${stt++}</td>
            <td class="cell"><span class="truncate">${product.name}</span></td>
            <td class="cell"><img src="../images/products/${product.image}" alt="" width="50" height="50"></td>
            <td class="cell"><span>${product.price} VNĐ</span></td>
            <td class="cell"><span class="badge bg-success">Còn Hàng</span></td>
            <td class="cell">
                <a class="btn-sm app-btn-secondary" href="./editProduct.html?id=${product.id}">Sửa</a>
                <button class="btn-sm app-btn-secondary bg-danger text-white" onclick='deleteSanPham(${product.id})'>Xóa</button>
            </td>
        </tr>
        `;
    }).join('');
};

let showProducts = function (Name) {
    fetch(API_URL + `${Name}`)
        .then(function (response) {
            response.json().then(function (data) {
                const products = layOutProduct(data);
                const show = document.getElementById('showProducts');
                show.innerHTML = products;
            });
        })
        .catch(function (error) {
            console.error('There was a problem with the Axios request:', error);
        });
};

showProducts(SP);

// xóa
let deleteSanPham = function(id){
    axios.delete(API_URL + SP + id)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
}

// thiển thị loại lên from

let showLoai = function() {
    axios.get(API_URL + 'categories')
        .then(response => {
            let showLoaiSp = document.getElementById('showSP');
            let html = '';
            response.data.forEach(element => {
                html += `<option id="categoryId" value="${element.id}">${element.name}</option>`;
            });
            showLoaiSp.innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
};

showLoai();

// hiển thị id sản phẩm và sửa

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(API_URL + SP + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById("productId").value = data.id;
            document.getElementById("editProductName").value = data.name;
            document.getElementById("editProductPrice").value = data.price;
            document.getElementById("editProductDetail").value = data.detail;
            document.getElementById("editProductImage").value = data.image;
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("editProductForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = document.getElementById("productId").value;
        const name = document.getElementById("editProductName").value;
        const price = document.getElementById("editProductPrice").value;
        const detail = document.getElementById("editProductDetail").value;
        const image = document.getElementById("editProductImage").value;

        axios.put(`${API_URL}products/${id}`, {
            name,
            price,
            detail,
            image
        })
        .then(response => {
            alert("Sửa Thành Công Sản Phẩm");
        })
        .catch(error => {
            console.error("Lỗi:", error);
        });
    });
})




// thêm

class AddProduct {
    constructor() {
        this.form = document.getElementById("addProduct");
        this.form.addEventListener('submit', this.addProduct.bind(this));
    }

    addProduct(event) {
        event.preventDefault();

        const name = document.getElementById('productName').value;
        const categoryId = document.getElementById('categoryId').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const detail = document.getElementById('productDetail').value;
        const image = document.getElementById('productImage').value;

        const newProduct = {
            name: name,
            cate_id: categoryId,
            price: price,
            detail: detail,
            image: image
        };

        // Send POST request using Axios
        axios.post(API_URL + SP, newProduct)
            .then(response => {
                alert("Thêm Sản Phẩm Thành Công");
                this.form.reset(); // reset from khi thêm thành công
            })
            .catch(error => {
                console.error("Error adding product:", error);
            });
    }
}

const addProduct = new AddProduct();




