import api from "./loginUrl";
import axios from 'axios';

// export function getStudnetList(params) {
//   return axios({
//     url: api.getStudnetList,
//     params: params,
//   });
// }
export function login(params) {
  return axios({
    url: api.login,
    data: params,
    method:"post"
  });
}