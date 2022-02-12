import api from "./finalUrl";
import axios from 'axios';

export function getStudnetList(params) {
  return axios({
    url: api.getStudnetList,
    params: params,
  });
}