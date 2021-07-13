import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


const state = {
    get UserToken () {
        return localStorage.getItem('token')
    },
    set UserToken (value) {
        localStorage.setItem('token', value)
    },
    routerIndex: '',
    menuName: ''
}

const actions = {

}
const mutations = {
    //登录 设置roken
    LOGIN_IN (state, token) {
        state.UserToken = token
    },
    //登出 清除token
    LOGIN_OUT (state) {
        state.UserToken = ''
    },
    //设置左侧菜单栏
    SET_ROUTER_INDEX (state, index) {
        state.routerIndex = index
    },
    SET_MENU_NAME (state, name) {
        state.menuName = name
    }

}


Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()]
})


