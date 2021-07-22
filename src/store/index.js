import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"


const state = {
    userInfo: '',
    UserToken: '',
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
        state.userInfo = ''
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


