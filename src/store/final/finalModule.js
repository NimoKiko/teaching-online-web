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
  getTree,
  addSection,
  delNode,
  getTask,
  saveOrEditTask,
  delTask,
  saveTeaLesson,
  updateTeaLesson,
  getSTS,
} from "./final";

const state = {
  stdList: [],
  stdPage: {},
  teaList: [],
  teaPage: {},
  lessonList: [],
  lessonPage: {},
  lessonStdList: [],
  tree: [],
  taskList:[],
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
  getTree({ commit }, data) {
    let p = getTree(data);
    p.then(res => {
      commit("GET_TREE", res);
    });
  },
  addSection({ commit }, data) {
    let p = addSection(data);
    return p;
  },
  delNode({ commit }, data) {
    let p = delNode(data);
    return p;
  },
  getTask({ commit }, data) {
    let p = getTask(data);
    p.then(res => {
      commit("GET_TASK_LIST", res);
    });
  },
  saveOrEditTask({ commit }, data) {
    let p = saveOrEditTask(data);
    return p;
  },
  delTask({ commit }, data) {
    let p = delTask(data);
    return p;
  },
  saveTeaLesson({ commit }, data) {
    let p = saveTeaLesson(data);
    return p;
  },
  updateTeaLesson({ commit }, data) {
    let p = updateTeaLesson(data);
    return p;
  },
  getSTS({ commit }, data) {
    let p = getSTS(data);
    return p;
  },
};
const mutations = {
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
    // console.log(res.data);
    state.lessonStdList = res.data;
  },
  GET_TREE(state, res) {
    // console.log(res.data);
    state.tree = res.data;
  },
  GET_TASK_LIST(state, res) {
    console.log(res.data);
    state.taskList = res.data;
  },
};
export default ({
  state,
  actions,
  mutations
});
