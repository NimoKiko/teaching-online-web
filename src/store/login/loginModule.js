import { Vue } from "@vueuse/core/node_modules/vue-demi";
import {
  login
} from "./login";

const state = {

};
const actions = {
  login({ commit }, data) {
    let p = login(data);
    p.then(res => {
      commit("LOGIN", res);
    });
  },
};
const mutations = {
  LOGIN(state, res) {
    console.log(res.data);
    localStorage.setItem("role",res.data);
    // state.taskList = res.data;
  },
};
export default ({
  state,
  actions,
  mutations
});
