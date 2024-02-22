let hienThiLoai = function () {
    fetch(API_URL + 'categories')
        .then(function (response) {
            response.json().then(function (data) {
                let loaiSp = document.getElementById("loaiSp");
                let html = '';
                data.forEach(element => {
                    html += `
                        <li><a href="./danhMuc.html?id=${element.id}">${element.name}</a></li>
                    `
                })
                loaiSp.innerHTML = html;
            })
        });
}
hienThiLoai();

let danhMuc = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
    fetch(API_URL + `products?cate_id=` + categoryId)
        .then(function (response) {
            response.json().then(function (data) {
                let danhMuc = document.getElementById("danhMuc");
                let html = '';
                data.forEach(product => {
                    html += `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="course-1-item">
                                <figure class="thumnail">
                                    <a href="./course-single.html?id=${product.id}"><img src="images/${product.image}" alt="Image" class="img-fluid"></a>
                                    <div class="price">${product.price} VNĐ</div>
                                    <div class="category text-truncate"><h3>${product.name}</h3></div>  
                                </figure>
                                <div class="course-1-content pb-4">
                                    <div class="rating text-center mb-3">
                                        <span class="icon-star2 text-warning"></span>
                                        <span class="icon-star2 text-warning"></span>
                                        <span class="icon-star2 text-warning"></span>
                                        <span class="icon-star2 text-warning"></span>
                                        <span class="icon-star2 text-warning"></span>
                                    </div>
                                    <p class="desc mb-4">${product.detail}</p>
                                    <p><a href="./course-single.html?id=${product.id}" class="btn btn-primary rounded-0 px-4">Chi Tiết Sản Phẩm</a></p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                danhMuc.innerHTML = html;
            })
        });
}
danhMuc();