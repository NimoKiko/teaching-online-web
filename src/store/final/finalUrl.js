const api = {
  // 学生模块接口
  getStudnetList: "http://localhost:9090/std/page",
  saveOrUpdate: "http://localhost:9090/std/addOrUpdate",
  deleteStudent: "http://localhost:9090/std/deleteStd",
  // 教师模块接口
  getTeacherList: "http://localhost:9090/tea/queryPage",
  saveOrUpdateTea: "http://localhost:9090/tea/addOrUpdate",
  deleteTeacher: "http://localhost:9090/tea//delTeacher",
  // 课程模块接口
  getLessonList: "http://localhost:9090/lesson/queryPage",
  saveOrUpdateLesson: "http://localhost:9090/lesson/saveOrUpdate",
  delLesson: "http://localhost:9090/lesson/delLesson",
  getLessonStd:"http://localhost:9090/stdLesson/getStudent",
  getTree:"http://localhost:9090/tree/getTree",
  addSection:"http://localhost:9090/tree/saveNode",
  delNode:"http://localhost:9090/tree/delNode",
  getTask:"http://localhost:9090/task/getTask",
  saveOrEditTask:"http://localhost:9090/task/saveTask",
  delTask:"http://localhost:9090/task/delTask",
  saveTeaLesson:"http://localhost:9090/teaLesson/save",
  updateTeaLesson:"http://localhost:9090/teaLesson/update",
  //阿里云oss
  fileUpload:"http://localhost:9090/upload/file",
}
export default api;