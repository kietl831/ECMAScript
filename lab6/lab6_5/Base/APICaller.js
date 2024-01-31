export class APICaller {
    constructor(baseUrl){
        this.baseUrl =baseUrl;
    }
    get(endpoint) {
      return axios.get(this.baseUrl + endpoint);
    }
}