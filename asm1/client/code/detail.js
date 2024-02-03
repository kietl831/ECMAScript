
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
function detailProduct(data) {
    let html = "";
    html += `
    <div class="col-md-6 mb-4">
        <p>
            <img src="images/${data.image}" alt="Image" class="img-fluid">
        </p>
    </div>
    <div class="col-lg-5 ml-auto align-self-center">
        <h2 class="section-title-underline mb-5">
            <span>${data.name}</span>
        </h2>
        
        <p><strong class="text-black d-block">Giá:</strong><span class="text-danger font-weight-bold">${data.price}  VNĐ</span></p>
        <p><strong class="text-black d-block">Mô Tả:</strong>${data.detail}</p>

        <ul class="ul-check primary list-unstyled mb-5">
            <li>Hàng chính hãng</li>
            <li>nội dung thấp dẫn  </li>
            <li>Miễn phí vận Chuyển</li>
            <li>Sản phẩm chất lượng</li>
            <li>Đóng gói cẩn thận </li>
        </ul>

        <p>
            <a href="#" class="btn btn-primary rounded-0 btn-lg px-5">Thêm Vào Giỏ Hàng</a>
        </p>
        <p>
            <a href="#" class="btn btn-primary rounded-0 btn-lg px-5">Mua Hàng</a>
        </p>

    </div>
  `;
    return html;
}
if (productId) {
    fetch(API_URL + "products/" + productId)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                let app = document.getElementById("detail_products");
                app.innerHTML = detailProduct(data);
            });
        })
        .catch(function (error) {
            console.error("Error fetching product details:", error);
        });
}