import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {}, // state 是纯数据，不写方法
  getters: {
    getToken: (state) => {
      return state.user.userInfo?.token // 使用可选链防止报错
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user
  }
})
