import {Post} from "./base.js";

export let myAPI = (API_URL) =>{
    let postURL = new Post(API_URL);
    postURL.getAll();
    postURL.getOne(1);
}
 
