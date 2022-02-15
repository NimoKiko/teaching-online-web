import api from "./finalUrl";
import axios from 'axios';

export function getStudnetList(params) {
  return axios({
    url: api.getStudnetList,
    params: params,
  });
}
export function saveOrUpdate(params) {
  return axios({
    url: api.saveOrUpdate,
    data: params,
    method:"post"
  });
}
export function deleteStudent(data) {
  return axios({
    url: api.deleteStudent,
    params: data,
    method: "delete"
  });
}