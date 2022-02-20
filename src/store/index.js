import { createStore } from 'vuex'
import final from "./final/finalModule"
import login from "./login/loginModule"


export default createStore({
  modules: {
    final,
    login
  }
});
