let name = "Lý Văn Kiệt";
const birthday = 2004;
const newYear = 2024;

//thay funtion() thành =>
let sayHello = () => {
    console.log(`I'm ${name}. I'm ${birthday}`);
}

let sayHello2 = () => {
    console.log(`I'm ${name}. life day ${(newYear - birthday)* 365}`);
}

sayHello();
sayHello2();

const API_URL = "https://www.boredapi.com/api/activity";
//
fetch("https://www.boredapi.com/api/activity")
    .then(function(response){
        console.log(response);
        // console.log(response.json());
        response.json().then(function(data){
            let app = document.getElementById('pc07051');
            let html = `<ul>
                <li>${data.accessibility}</li>
                <li>${data.activity}</li>
                <li>${data.key}</li>
                <li>${data.link}</li>
                <li>${data.participants}</li>
                <li>${data.price}</li>
                <li>${data.type}</li>
            </ul>`
            app.innerHTML = html;
            console.log(data);
        })
    })
    .catch(function(error){

    });