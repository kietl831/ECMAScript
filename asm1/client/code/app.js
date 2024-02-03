const API_URL = 'http://localhost:3000/';
let hienThiSanPham = function () {
    let html = "";
    fetch(API_URL + 'products')
        .then(function (response) {
            response.json().then(function (data) {
                const hienThi = document.getElementById('sanPham');
                data.forEach(element => {
                    html += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="course-1-item">
                        <figure class="thumnail">
                        <a href="course-single.html"><img src="images/${element.image}" alt="Image" class="img-fluid"></a>
                        <div class="price">${element.price}</div>
                        <div class="category"><h3>${element.name}</h3></div>  
                        </figure>
                        <div class="course-1-content pb-4">
                        <div class="rating text-center mb-3">
                            <span class="icon-star2 text-warning"></span>
                            <span class="icon-star2 text-warning"></span>
                            <span class="icon-star2 text-warning"></span>
                            <span class="icon-star2 text-warning"></span>
                            <span class="icon-star2 text-warning"></span>
                        </div>
                        <p class="desc mb-4">${element.detail}</p>
                        <p><a href="./course-single.html?id=${element.id}" class="btn btn-primary rounded-0 px-4">Chi Tiết Sản Phẩm</a></p>
                        </div>
                    </div>
                </div>
                        
                `
                });
                hienThi.innerHTML = html;
            })
        })
        .catch(function (error) {

        });
}


hienThiSanPham();
