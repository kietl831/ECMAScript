import { APICaller } from "../Base/APICaller.js";

export class Comments extends APICaller {
    constructor(baseUrlr) {
      super(baseUrlr);
      this.endpoint = 'comments';
    }
  
    getAll() {
        this.get(this.endpoint).then(data => console.log(data.data));
    }
  
    getOne(id) {
      return this.get(this.endpoint +`/${id}`).then(data => console.log(data.data));
    }
}