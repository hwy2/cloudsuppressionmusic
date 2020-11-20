import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        isLogin: true, // 添加该字段，表示进入这个路由是需要登录的
    }, //路由元
    redirect: {
        name: 'find'
    },
    children: [{
        path: '/home/find',
        name: 'find',
        component: () => import('../views/find/find.vue')
    }, {
        path: '/home/me',
        name: 'me',
        component: () => import('../views/me/me.vue')
    }, {
        path: '/home/yuncun',
        name: 'yuncun',
        component: () => import('../views/yuncun/yuncun.vue'),
        redirect: {
            name: 'square'
        },
        children: [{
            path: '/home/yuncun/square',
            name: 'square',
            component: () => import('../views/yuncun/square/square.vue'),
        }, {
            path: '/home/yuncun/follow',
            name: 'follow',
            component: () => import('../views/yuncun/follow/follow.vue'),
        }]
    }, {
        path: '/home/videoY',
        name: 'videoY',
        component: () => import('../views/video/video.vue')
    }]
}, {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
}]

const router = new VueRouter({
    routes
})

export default router