import {
  getStudnetList,
  saveOrUpdate,
  deleteStudent,
  getTeacherList,
  saveOrUpdateTea,
  deleteTeacher,
  getLessonList,
  saveOrUpdateLesson,
  delLesson,
  getLessonStd,
} from "./final";

const state = {
  stdList:[],
  stdPage:{},
  teaList:[],
  teaPage:{},
  lessonList:[],
  lessonPage:{},
  lessonStdList:[],
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
  getLessonList({ commit }, data) {
    let p = getLessonList(data);
    p.then(res => {
      commit("GET_LESSON_LIST", res);
    });
  },
  saveOrUpdateLesson({ commit }, data) {
    let p = saveOrUpdateLesson(data);
    return p;
  },
  delLesson({ commit }, data) {
    let p = delLesson(data);
    return p;
  },
  getLessonStd({ commit }, data) {
    let p = getLessonStd(data);
    p.then(res => {
      commit("GET_LESSON_STUDENT", res);
    });
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
  GET_LESSON_LIST(state, res) {
    // console.log(res.data);
    state.lessonList = res.data.records;
    let pagination = {
      page: res.data.pages,
      total: res.data.total
    }
    console.log(pagination);
    state.lessonPage = pagination;
  },
  GET_LESSON_STUDENT(state, res) {
    console.log(res.data);
    state.lessonStdList = res.data;
  },

};
export default({
  state,
  actions,
  mutations
});
