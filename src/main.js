import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import cookies from 'js-cookie'
import "./assets/less/public.less"
import "./router/permission.js"

// 引用全部mint UI
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
import {
    Lazyload
} from 'mint-ui';

Vue.use(Lazyload);

import {
    Toast
} from "mint-ui";

// 引用手淘rem
import 'lib-flexible'

// 配置Axios
Vue.prototype.$axios = Axios

//配置公共url
let host = window.location.host; //主机
let reg = /^localhost+/;
if (reg.test(host)) {
    //若本地项目调试使用
    Axios.defaults.baseURL = 'https://3dcw.cn:3000';
} else {
    Axios.defaults.baseURL = 'https://wx.3dcw.cn';
}
Axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
// Axios.defaults.headers.common['Authorization'] = cookie.get("cookie"); //手动带上cookie
Axios.defaults.withCredentials = true; //设置默认跨域，有可能出问题，后期有问题排查这里


Vue.config.productionTip = false
//弹出框禁止滑动
Vue.prototype.noScroll = function () {
    var mo = function (e) {
        e.preventDefault()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', mo, false) // 禁止页面滑动
}

//弹出框可以滑动
Vue.prototype.canScroll = function () {
    var mo = function (e) {
        e.preventDefault()
    }
    document.body.style.overflow = 'auto' // 出现滚动条
    document.removeEventListener('touchmove', mo, false)
}

Vue.prototype.cookiesControl = function (type, name = "", value = "") {
    let result = [];
    switch (type) {
        case "set":
            cookies.set(name, value);
            break;
        case "get":
            result = cookies.get(name);
            break;
        case "remove":
            cookies.remove(name);
            break;
        default:
            break;
    }
    if (type == "get" && name != "cookie") {
        return JSON.parse(result);
    } else {
        return result;
    }

}; //cookie操作


//获取当前登录态
Vue.prototype.getLoginStatus = function () {
    let status = false;

    this.$axios({
            url: `/login/status`,
            withCredentials: true
        })
        .then(res => {
            // window.console.log("登录状态:", res.data);
            if (res.data.code === 200) {
                status = true;
            } else {
                status = false;
            }
        })
        .catch(error => {
            window.console.log("获取登录态失败！", error);
        });
    return status;
}

// 获取音乐是否可以播放并获取相应的播放url
Vue.prototype.getplayMusic = function (songinfoId, songinfo) {
    // 根据id查看是否有权限播放
    let _this = this;
    this.$axios.
    get("/check/music", {
            params: {
                id: songinfoId
            }
        }).then(res => {
            window.console.log("音乐是否可用", res.data);
            if (res.data.success) {
                _this.getMusicUrl(songinfoId, songinfo);
            } else {
                Toast({
                    message: "亲爱的,暂无版权，已为你播放下一首",
                    position: "top",
                    duration: 3000
                });
                this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
            }
        })
        .catch(error => {
            // this.$store.commit("setisPlay", false);
            Toast({
                message: "亲爱的,暂无版权，已为你播放下一首",
                position: "top",
                duration: 3000
            });
            this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
            window.console.log("歌曲URL获取失败！", error);
        });
}

Vue.prototype.getMusicUrl = function (songinfoId, songinfo) {
    // 根据localStorage的歌曲id,获取详细歌曲的信息
    this.$axios
        .get("/song/url", {
            params: {
                id: songinfoId
            }
        })
        .then(res => {
            window.console.log("歌曲详情：", res);
            if (res.data.data[0].url != null) {
                this.$store.commit("setsongInfo", songinfo);
                this.$store.commit("setsongPlayUrl", res.data.data[0].url);
                this.$store.commit("setisPlay", true);
                window.console.log("歌曲详情：", res.data);
            } else {
                Toast({
                    message: "亲爱的,暂无版权，已为你播放下一首",
                    position: "top",
                    duration: 3000
                });
                this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
            }

        })
        .catch(error => {
            this.$store.commit("setisPlay", false);
            window.console.log("歌曲URL获取失败！", error);
        });
}

Vue.prototype.playAudioControl = function (_this) {
        // 播放音乐，并修改状态
        // window.console.log(document.getElementById("audioPlayer"));
        _this.$refs.audio.play();
        _this.$store.commit("setisPlay", true);
        let musicrotateAn = document.getElementById("musicImg");
        musicrotateAn.setAttribute(
            "style",
            "-webkit-animation: rotateAn 8s linear infinite; animation: rotateAn 8s linear infinite;"
        );
    },

    // 下一首
    Vue.prototype.nextSong = function (number, songlist) {
        // window.console.log("aa", this.$store.getters.getserialNumber)
        // window.console.log(number, songlist);
        if (songlist.length > 1 && number < songlist.length - 1) {
            this.$store.commit("setserialNumber", number + 1);
            if (!songlist[number + 1].picUrl) {
                songlist[number + 1]["picUrl"] = songlist[number + 1].al.picUrl;
            }
            this.getplayMusic(songlist[number + 1].id ? songlist[number + 1].id : songlist[number + 1].resourceId, songlist[number + 1]);
        } else {
            this.$store.commit("setisPlay", false);
            Toast({
                message: "列表已播放完",
                position: "center",
                duration: 3000
            });
        }
    }

// 上一首
Vue.prototype.lastSong = function (number, songlist) {
    if (songlist.length > 1 && number < songlist.length - 1 && number != 0) {
        this.$store.commit("setserialNumber", number - 1);
        songlist[number - 1]["picUrl"] = songlist[number - 1].al.picUrl;
        this.getplayMusic(songlist[number - 1].id, songlist[number - 1]);
    } else {
        // this.$store.commit("setisPlay", false);
        if (number == 0) {
            Toast({
                message: "这是第一首哦！",
                position: "center",
                duration: 3000
            });
        } else {
            this.$store.commit("setisPlay", false);
            Toast({
                message: "列表已播放完",
                position: "center",
                duration: 3000
            });
        }

    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
