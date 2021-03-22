import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: localStorage.getItem("token"),
    user: JSON.parse(sessionStorage.getItem('user')),
    essay: sessionStorage.getItem('essay')
  },
  mutations: {
    // set
    // SET_TOKEN: (state, token) => {
    //     state.token = token
    //     //存到浏览器
    //     localStorage.setItem("token", token)
    // },
    SET_USER: (state, user) => {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    SET_ESSAY: (state, essay) => {
      state.essay = essay
      sessionStorage.setItem('essay', essay)
    },

    REMOVE_USER: (state) => {
      // state.token = ''
      // state.userInfo = {}
      // localStorage.setItem("token", '')
      sessionStorage.setItem('user', JSON.stringify(''))
      sessionStorage.clear()
    }
  },
  getters: {
    // get
    GET_USER: (state) => {
      return state.user
    },
    GET_ESSAY: (state) => {
      return state.essay
    }
  },
  actions: {},
  modules: {}
})
