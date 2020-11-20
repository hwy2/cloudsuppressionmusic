import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
// import cookie from "json-cookie";
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

// import {
//   Toast
// } from "mint-ui";

// 引用手淘rem
import 'lib-flexible'

// 配置Axios
Vue.prototype.$axios = Axios
//配置公共url
Axios.defaults.baseURL = 'http://3dcw.cn:5005'
Axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
// Axios.defaults.headers.Cookie = cookie.get("cookie"); //手动带上cookie
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

//获取当前登录态
Vue.prototype.getLoginStatus = function () {
    let status = false;
    this.$axios
        .get("/login/status")
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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')