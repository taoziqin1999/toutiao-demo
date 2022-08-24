import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

const TOUTIAO_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 是一个对象，存储用户的登录状态信息，
    userInfo: getItem(TOUTIAO_KEY)
  },
  mutations: {
    setuserInfo (state, data) {
      state.userInfo = data
      setItem(TOUTIAO_KEY, state.userInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
