const API_URL = 'http://localhost:3000/';
const categories = "categories/";

let layOutTypeProduct = (data) => {
    let stt = 1;
    return data.map(typeProduct => {
        return `
        <tr>
            <td class="cell">${stt++}</td>
            <td class="cell"><span class="truncate">${typeProduct.name}</span></td>
            <td class="cell">
                <a class="btn-sm app-btn-secondary" href="./editType.html?id=${typeProduct.id}">Sửa</a>
                <button class="btn-sm app-btn-secondary bg-danger text-white" onclick='deleteType(${typeProduct.id})'>Xóa</button>
            </td>
        </tr>
        `;
    }).join('');
};

let showTypeProducts = function (Name) {
    fetch(API_URL + `${Name}`)
        .then(function (response) {
            response.json().then(function (data) {
                const TypeProducts = layOutTypeProduct(data);
                const show = document.getElementById('showTypeProducts');
                show.innerHTML = TypeProducts;
            });
        })
        .catch(function (error) {
            console.error('There was a problem with the Axios request:', error);
        });
};

showTypeProducts(categories);

// xóa

let deleteType = function(id){
    axios.delete(API_URL + categories + id)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
}




// hiển thị id loại sản phẩm và sửa

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(API_URL + categories + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById("categoryId").value = data.id;
            document.getElementById("editTypeName").value = data.name;
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("editType").addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("categoryId").value;
        const name = document.getElementById("editTypeName").value;

        axios.put(API_URL + categories + id, {
            name: name,
        })
        .then(response => {
            alert("Sửa Thành Công Loại Sản Phẩm");
        })
        .catch(error => {
            console.log("Lỗi", error);
        });
    });
});

//thêm
class addType{
    constructor(){
        // thêm
        this.from =  document.getElementById("addType");
        this.from.addEventListener('submit', this.addTypeProduct.bind(this));
        
    }
    // thêm
    addTypeProduct(event){
        event.preventDefault();

        const name = document.getElementById('typeName').value;

        axios.post(API_URL + categories , {
            
            name: name,
        }).then(response => {
            const add = response.data;
            alert("Thêm Thành Công Loại Sản Phẩm");
        }).catch(error => {
            console.log("Lỗi", error);
        })
    }

    
}
const addTypeSP = new addType();