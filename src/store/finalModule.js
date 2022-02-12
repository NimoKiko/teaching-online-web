import {
  getStudnetList
} from "./final";

const state = {
  stdList:[]
};
const actions = {
  getStudnetList({ commit }, data) {
    let p = getStudnetList(data);
    p.then(res => {
      commit("GET_STUDENT_LIST", res);
    });
  },
};
const mutations  = {
  GET_STUDENT_LIST(state, res) {
    // console.log(res.data.records);
    state.stdList = res.data.records;
  },
};
export default({
  state,
  actions,
  mutations
});
