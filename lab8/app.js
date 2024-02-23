let API_URL = "https://data-9337e-default-rtdb.firebaseio.com/";

let getUsers = async () => {
    const response = await fetch(API_URL + 'products.json');
    let data = await response.json();
    return data;
}
console.log(getUsers());


getUsers().then((data) => {
    //Object đối tượng trong Javascript
    // có phương thức values dùng để chuyển đổi các thuộc tính => mảng
    //nếu gọi json-server thì không cần dòng nàng trong
    // data= Object.values (data);

    let html = `
    <table class="table table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Giá</th>
                <th></th>
                <td></td>
            </tr>
        </thead>
        <tbody>
    `;
    Object.entries(data).forEach(([id, value], index) => {
        console.log(value);
        if (value) {
            html += `
            <tr>
                <td>${index + 1}</td>
                <td>${value.name}</td>
                <td>${value.price} VNĐ</td>
                <td><button class="btn btn-success" onclick="editUser('${id}')">Sửa</button></td>
                <td><button class="btn btn-danger" onclick="deleteUser('${id}')">xóa</button></td>
            </tr>
        `;
        } else {
            console.log("sai");
        }

    });
    html += `
        </tbody>
        </table>
    `;
    document.getElementById('hienThi').innerHTML = html;
}).catch((error) => {
    console.log(error);
})

// let createUser = (data) => {
//     let object = {
//         method: "POST",
//         data: {
//             name: data.element.name.value,
//         }
//     }
//     let user = fetch(API_URL+"categories.json", {

//     })
// }


// Thêm
let createUser = (data1) => {
    // Ngăn chặn hành động mặc định của sự kiện. Trong trường hợp này, ngăn chặn việc gửi biểu mẫu để làm mới trang.
    event.preventDefault();

    // Tạo một đối tượng FormData mới từ dữ liệu được cung cấp (data1)
    let data = new FormData(data1);

    // Ghi log giá trị của trường 'name' từ dữ liệu biểu mẫu
    console.log(data.get('name'));

    // Thực hiện một yêu cầu POST sử dụng thư viện axios
    axios({
        method: "post",
        url: API_URL + 'products.json',
        data: {
            name: data.get('name'), // Trích xuất giá trị của trường 'name' từ dữ liệu biểu mẫu
            price: data.get('price'), // Trích xuất giá trị của trường 'price' từ dữ liệu biểu mẫu
        },
    }).then(function (response) { // Xử lý phản hồi từ máy chủ
        console.log(response); // Ghi log dữ liệu phản hồi ra console
    });
}


document.getElementById('form').addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(this);
})


//xóa

let deleteUser = (cate_id) => {
    fetch(API_URL + 'products/' + cate_id + ".json", {
        method: 'delete',
    }).then(response => {
        if (response.ok) {
            // Xóa thành công, bạn có thể thực hiện các hành động tiếp theo ở đây
            alert("Đã xóa người dùng thành công");
        } else {
            // Xóa không thành công, xử lý lỗi nếu cần
            console.error("Lỗi khi xóa người dùng");
        }
    })
        .catch(error => {
            // Xử lý lỗi kết nối
            console.error('Lỗi kết nối:', error);
        });
};


// hàm lấy dữ liệu từ api - sửa dữ liệu/ lấy 1 dữ liệu
let getIdUser = async (cate_id) => {
    const response = await fetch(API_URL + 'products/' + cate_id + '.json');
    let data = await response.json();
    return data;
}

// sửa

// hàm load dữ liệu vào form sửa
let editUser = (cate_id) => {

    // Lấy dữ liệu người dùng từ API
    let user = getIdUser(cate_id);

    // Lấy tham chiếu đến form
    let form = document.getElementById("form");

    user.then((data) => {
        // Điền dữ liệu vào các trường input
        form.querySelector('input[name="name"]').value = data.name;
        form.querySelector('input[name="price"]').value = data.price;
    })

    // code tiếp save dữ liệu

    // Lắng nghe sự kiện click với id là edit
    let edit = document.getElementById("edit");
    edit.addEventListener('click', async () => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        axios(API_URL + 'products/' + cate_id + '.json', {
            method: 'put',
            data: {
                name: form.querySelector('input[name="name"]').value,
                price: form.querySelector('input[name="price"]').value
            }
        }).then(function (response) {
            console.log(response);
        });

    });

}


