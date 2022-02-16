import {
  getStudnetList,
  saveOrUpdate,
  deleteStudent
} from "./final";

const state = {
  stdList:[],
  stdPage:{},
};
const actions = {
  getStudnetList({ commit }, data) {
    let p = getStudnetList(data);
    p.then(res => {
      commit("GET_STUDENT_LIST", res);
    });
  },
  saveOrUpdate({ commit }, data) {
    let p = saveOrUpdate(data);
    return p;
  },
  deleteStudent({ commit }, data) {
    let p = deleteStudent(data);
    return p;
  },
};
const mutations  = {
  GET_STUDENT_LIST(state, res) {
    // console.log(res.data.records);
    state.stdList = res.data.records;
    let pagination = {
      page: res.data.pages,
      total: res.data.total
    }
    console.log(pagination);
    state.stdPage = pagination;
  },
};
export default({
  state,
  actions,
  mutations
});
