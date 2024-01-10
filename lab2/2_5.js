let API_URL = "https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students";

function generateteTableHeader(headerTitle){
    // if(!headerTitle || headerTitle.length === 0){
    //     return "";
    // }

    // let html = headerTitle.map((title) => `${title}`);

    let html = ``;
    headerTitle.forEach(element => {
        html += `<th>${element}</th>`
    });
    return `<thead><tr>${html}</tr></thead>`;
}
let headrtTitles = [
    'STT',
    'Ảnh đại diện',
    'Họ và tên',
    'Ngày sinh',
];
// console.log(generateteTableHeader(headrtTitles));

function generateteTableRowStudents(data){
    // if(!rowData || rowData.length === 0){
    //     return "";
    // }

    return `<tr>
                <td>${data.id}</td>
                <td><img height= "50" src="${data.avatar}" alt="" srcset=""></td>
                <td>${data.name}</td>
                <td>${data.createAt}</td>
            </tr>
    `;

}

let object = {
    id: 1,
    name: "Mai Hao Hao",
    avatar: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-hai-nhat-qua-dat.jpg",
    createAt: "9h10p",
}

console.log(document.write(generateteTableRowStudents(object)));

function generateteTable (header, data){
    let html = ``;

    let headerRow = generateteTableHeader(header);

    data.forEach(element => {
        html += generateteTableRowStudents(element);
    });

    return `<table>${headerRow} <tbody>${html}</tbody></table>`;
}


fetch(API_URL)
    .then(function (response){
        console.log(response);
        response.json().then(function (data){
            console.log(data);
            let dataFaker = [{
                id: 1,
                name: "Mai Hao Hao",
                avatar: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-hai-nhat-qua-dat.jpg",
                createAt: "9h10p",
            }]
            let headers = [
                "id",
                "ảnh đại diện",
                "tên",
                "ngày tạo",
            ]
            let app = document.getElementById('pc07051' +
                '');
            app.innerHTML = generateteTable(headers, dataFaker);
        });
    })
    .catch(function (response){
        console.log("Error: \n"+ response);
    });

