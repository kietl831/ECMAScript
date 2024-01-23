const API_URL = 'http://localhost:3000/products/';

let sanPhamChiTiet = (data) => {
    return `
    <div class="col-md-6 mb-4">
        <p>
            <img src="images/${data.image}" alt="Image" class="img-fluid">
        </p>
    </div>
    <div class="col-lg-5 ml-auto align-self-center">
        <h2 class="section-title-underline mb-5">
            <span>${data.name}</span>
        </h2>
        
        <p><strong class="text-black d-block">Giá:</strong>${data.price}</p>
        <p class="mb-5"><strong class="text-black d-block">Hours:</strong> 8:00 am &mdash; 9:30am</p>
        <p>${data.detail}</p>
        <p></p>

        <ul class="ul-check primary list-unstyled mb-5">
            <li>Lorem ipsum dolor sit amet consectetur</li>
            <li>consectetur adipisicing  </li>
            <li>Sit dolor repellat esse</li>
            <li>Necessitatibus</li>
            <li>Sed necessitatibus itaque </li>
        </ul>

        <p>
            <a href="#" class="btn btn-primary rounded-0 btn-lg px-5">Thêm Vào Giỏ Hàng</a>
        </p>
        <p>
            <a href="#" class="btn btn-primary rounded-0 btn-lg px-5">Mua Hàng</a>
        </p>

    </div>
    `
}
let Axios = function (Name) {
    fetch(API_URL + `${Name}`)
        .then(function(response) {
            response.json().then(function (data) {
                const ctSanPham = sanPhamChiTiet(data);
                const idSanPham = document.getElementById('ctSanPham');
                idSanPham.innerHTML = ctSanPham;
            })
        })
        .catch(function (error) {
            console.error('There was a problem with the Axios request:', error);
        });
}

Axios("1");
