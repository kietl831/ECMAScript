const API_URL = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
    .then(function(response){

        response.json().then(function(data){
            console.log(data.data);
            let app = document.getElementById('pc07051');
            let list =  data.data;
            let index = 1
            let html = `<table class="table">
            <tr>
              <th></th>
              <th>Nation</th>
              <th>Year</th>
              <th>Population</th>
            </tr>`;
            list.forEach(element1 =>{
                html += `<tr>
                    <td>${index}</td>
                    <td>${element1.Nation}</td>
                    <td>${element1.Year}</td>
                    <td>${element1.Population}</td>
            </tr>`
                index++;
            });
            html += `</table>`;

            app.innerHTML = html;

        })
    })
    .catch(function(error){

    });

const API_URL1 = "https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students";
fetch("https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students")
    .then(function(response1){

        response1.json().then(function(data1){
            console.log(data1);
            let app1 = document.getElementById('bai2');
            let list =  data1;
            let index = 1;
            let html = `<table class="table">
            <tr>
              <th></th>
              <th>Ảnh đại diện</th>
              <th>Họ và tên</th>
              <th>Ngày Tạo</th>
            </tr>`;
            list.forEach(element =>{
                html += `<tr>
                    <td>${index}</td>
                    <td><img src="${element.avatar}" alt=""> </td>
                    <td>${element.name}</td>
                    <td>${element.createdAt}</td>
            </tr>`
                index++;
            });
            html += `</table>`;

            app1.innerHTML = html;

        })
    })
    .catch(function(error){

    });

