const API_URL = 'http://localhost:3000/';

let layOutTypeProduct = (data) => {
    let stt = 1;
    return data.map(typeProduct => {
        return `
        <tr>
            <td class="cell">${stt++}</td>
            <td class="cell"><span class="truncate">${typeProduct.name}</span></td>
            <td class="cell">
                <a class="btn-sm app-btn-secondary" href="#">Sửa</a>
                <a class="btn-sm app-btn-secondary bg-danger text-white" href="#">Xóa</a>
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

showTypeProducts("categories");
