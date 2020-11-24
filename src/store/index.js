import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: "", //当前路由
        dailySongs: [], //每日推荐歌曲
        songInfo: [], //音乐信息
        songPlayUrl: '', //音乐播放链接
        playlist: [], //播放列表
        serialNumber: 0, //播放列表序号
        musicSize: 0, //音乐长度
        isPlay: false, //播放状态 
    },
    getters: {
        getselected(state) {
            return state.selected;
        },
        getdailySongs(state) {
            return state.dailySongs;
        },
        getsongInfo(state) {
            return state.songInfo;
        },
        getsongPlayUrl(state) {
            return state.songPlayUrl;
        },
        getplaylist(state) {
            return state.playlist;
        },
        getserialNumber(state) {
            return state.serialNumber;
        },
        getmusicSize(state) {
            return state.musicSize;
        },
        getisPlay(state) {
            return state.isPlay;
        },
    },
    mutations: {
        setSelected(state, status) {
            state.selected = status;
        },
        setdailySongs(state, status) {
            state.dailySongs = status;
        },
        setsongInfo(state, status) {
            state.songInfo = JSON.parse(status);
        },
        setsongPlayUrl(state, status) {
            state.songPlayUrl = status;
        },
        setplaylist(state, status) {
            state.playlist = status;
        },
        setserialNumber(state, status) {
            state.serialNumber = status;
        },
        setmusicSize(state, status) {
            state.musicSize = status;
        },
        setisPlay(state, status) {
            state.isPlay = status;
        },
    },
    actions: {},
    modules: {}
})