const API_URL = 'http://localhost:3000/';

let layOutOrders = (data) => {
    let stt = 1;
    return data.map(order => {
        return `
        <tr>
            <td class="cell">${stt++}</td>
            <td class="cell"><span class="truncate">${order.customer_name}</span></td>
            <td class="cell">${order.created_date}</td>
            <td class="cell"><span>${order.order_total}</span></td>
            <td class="cell"><span class="badge bg-success">${order.status}</span></td>
            <td class="cell">
                <a class="btn-sm app-btn-secondary" href="#">Xem</a>
            </td>
        </tr>
        `;
    }).join('');
};

let showOrders = function (Name) {
    fetch(API_URL + `${Name}`)
        .then(function (response) {
            response.json().then(function (data) {
                const orders = layOutOrders(data);
                const show = document.getElementById('showOrders');
                show.innerHTML = orders;
            });
        })
        .catch(function (error) {
            console.error('There was a problem with the Axios request:', error);
        });
};

showOrders("orders");
