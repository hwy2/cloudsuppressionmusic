import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: "", //当前路由
        dailySongs: "", //每日推荐歌曲
    },
    getters: {
        getselected(state) {
            return state.selected;
        },
        getdailySongs(state) {
            return state.dailySongs;
        }
    },
    mutations: {
        setSelected(state, status) {
            state.selected = status;
        },
        setdailySongs(state, status) {
            state.dailySongs = status;
        },
    },
    actions: {},
    modules: {}
})