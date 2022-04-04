import axios from 'axios';
export function totalCustomerApi() {
      return axios.post("http://localhost:4000/totalCustomer");

}

export function totalUserApi() {
      return axios.post("http://localhost:4000/totalUser");

}

