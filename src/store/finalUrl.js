const api = {
  // 学生模块接口
  getStudnetList:"http://localhost:9090/std/page",
  saveOrUpdate:"http://localhost:9090/std/addOrUpdate",
  deleteStudent:"http://localhost:9090/std/deleteStd",
  // 教师模块接口
  getTeacherList:"http://localhost:9090/tea/queryPage",
  saveOrUpdateTea:"http://localhost:9090/tea/addOrUpdate",
  deleteTeacher:"http://localhost:9090/tea//delTeacher"
}
export default api;