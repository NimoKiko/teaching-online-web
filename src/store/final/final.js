import api from "./finalUrl";
import axios from 'axios';

// export function getStudnetList(params) {
//   return axios({
//     url: api.getStudnetList,
//     params: params,
//   });
// }
// 获取学生列表
export function getStudnetList(params) {
  return axios({
    url: api.getStudnetList,
    data: params,
    method:"post"
  });
}
// 更新或添加学生表
export function saveOrUpdate(params) {
  return axios({
    url: api.saveOrUpdate,
    data: params,
    method:"post"
  });
}
// 删除学生
export function deleteStudent(data) {
  return axios({
    url: api.deleteStudent,
    params: data,
    method: "delete"
  });
}
// 获取教师表
export function getTeacherList(params) {
  return axios({
    url: api.getTeacherList,
    data: params,
    method:"post"
  });
}
//更新或添加教师表
export function saveOrUpdateTea(params) {
  return axios({
    url: api.saveOrUpdateTea,
    data: params,
    method:"post"
  });
}
//删除教师
export function deleteTeacher(data) {
  return axios({
    url: api.deleteTeacher,
    params: data,
    method: "delete"
  });
}
//获取课程列表
export function getLessonList(params) {
  return axios({
    url: api.getLessonList,
    data: params,
    method:"post"
  });
}
//更新或添加课程列表
export function saveOrUpdateLesson(params) {
  return axios({
    url: api.saveOrUpdateLesson,
    data: params,
    method:"post"
  });
}
//删除课程
export function delLesson(data) {
  return axios({
    url: api.delLesson,
    params: data,
    method: "delete"
  });
}
//获取课程对应的学生表
export function getLessonStd(params) {
  return axios({
    url: api.getLessonStd,
    params: params,
  });
}
//获取课程对应的树结构
export function getTree(params) {
  return axios({
    url: api.getTree,
    params: params,
  });
}
//新增大章/小节
export function addSection(params) {
  return axios({
    url: api.addSection,
    data: params,
    method:"post"
  });
}
//删除节点
export function delNode(data) {
  return axios({
    url: api.delNode,
    params: data,
    method: "delete"
  });
}
//获取作业列表
export function getTask(params) {
  return axios({
    url: api.getTask,
    params: params,
  });
}
//新增或修改作业
export function saveOrEditTask(params) {
  return axios({
    url: api.saveOrEditTask,
    data: params,
    method:"post"
  });
}
//删除节点
export function delTask(data) {
  return axios({
    url: api.delTask,
    params: data,
    method: "delete"
  });
}
//保存教师课表到数据库
export function saveTeaLesson(params) {
  return axios({
    url: api.saveTeaLesson,
    data: params,
    method:"post"
  });
}
//更新教师课表到数据库
export function updateTeaLesson(params) {
  return axios({
    url: api.updateTeaLesson,
    data: params,
    method:"post"
  });
}
//阿里云获取STS
export function fileUpload(params) {
  return axios({
    url: api.fileUpload,
    data: params,
    method:"post"
  });
}