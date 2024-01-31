import { APICaller } from "../Base/APICaller.js";

export class Post extends APICaller {
    constructor(baseUrlr) {
      super(baseUrlr);
      this.endpoint = 'posts';
    }
  
    getAll() {
        this.get(this.endpoint).then(data => console.log(data.data));
    }
  
    getOne(id) {
      return this.get(this.endpoint +`/${id}`).then(data => console.log(data.data));
    }
}