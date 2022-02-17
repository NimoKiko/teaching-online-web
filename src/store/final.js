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