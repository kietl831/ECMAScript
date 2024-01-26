// code của Lý Văn Kiệt PC07051

class APICaller {
    constructor(baseUrl){
        this.baseUrl =baseUrl;
    }
    get(endpoint) {
      return axios.get(this.baseUrl + endpoint);
    }
}


class Comment extends APICaller {
    constructor(baseUrlr,endpoint) {
      super(baseUrlr);
      this.endpoint = endpoint;
    }
  
    getAll() {
        this.get(this.endpoint).then(data => console.log(data.data));
    }
  
    getOne(id) {
      return this.get(this.endpoint +`/${id}`).then(data => console.log(data.data));
    }
}

class Post extends APICaller {
  constructor(baseUrlr,endpoint) {
    super(baseUrlr);
    this.endpoint = endpoint;
  }

  getAll() {
      this.get(this.endpoint).then(data => console.log(data.data));
  }

  getOne(id) {
    return this.get(this.endpoint +`/${id}`).then(data => console.log(data.data));
  }
}

let myAPI = (API_URL,endpoint) =>{
  let commentURL = new Comment(API_URL,endpoint);
  commentURL.getAll();
  commentURL.getOne(1);
}
myAPI('http://localhost:3000/','comments');
myAPI('http://localhost:3000/','posts');



// axios.get(commentAPI.getAll()).then(response => console.log('All comments:', response.data));
//
// axios.get(commentAPI.getOne(1)).then(response => console.log('Comment with ID 1:', response.data));


