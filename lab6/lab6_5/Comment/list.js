import {Comments} from "./base.js";

export let myAPI = (API_URL) =>{
    let commentsURL = new Comments(API_URL);
    commentsURL.getAll();
    commentsURL.getOne(1);
}