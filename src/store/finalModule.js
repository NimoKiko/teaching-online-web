import {
  getStudnetList,
  saveOrUpdate,
  deleteStudent,
  getTeacherList,
  saveOrUpdateTea,
  deleteTeacher,
} from "./final";

const state = {
  stdList:[],
  stdPage:{},
  teaList:[],
  teaPage:{},
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
  getTeacherList({ commit }, data) {
    let p = getTeacherList(data);
    p.then(res => {
      commit("GET_TEACHER_LIST", res);
    });
  },
  saveOrUpdateTea({ commit }, data) {
    let p = saveOrUpdateTea(data);
    return p;
  },
  deleteTeacher({ commit }, data) {
    let p = deleteTeacher(data);
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
    // console.log(pagination);
    state.stdPage = pagination;
  },
  GET_TEACHER_LIST(state, res) {
    // console.log(res.data.records);
    state.teaList = res.data.records;
    let pagination = {
      page: res.data.pages,
      total: res.data.total
    }
    // console.log(pagination);
    state.teaPage = pagination;
  },
};
export default({
  state,
  actions,
  mutations
});
