import { API_URL } from "./base.js";

export let deleteSanPham = function(id){
    axios.delete(API_URL + 'products/' + id)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log("Error: ", error);
    })
}
