const API_URL = 'http://localhost:3000/';

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
                <a class="btn-sm app-btn-secondary" href="#">Sửa</a>
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

showProducts("products");

// xóa
let deleteSanPham = function(id){
    axios.delete(API_URL + 'products/' + id)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
}


