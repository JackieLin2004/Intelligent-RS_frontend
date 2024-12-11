import {createRouter, createWebHashHistory} from 'vue-router'
import {unauthorized} from "@/net/index.js";

import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
    // 路由器工作模式
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})

// 路由守卫，防止未登录可以访问其他页面
router.beforeEach((to, from, next) => {
    const isUnauthorized = unauthorized();
    // 如果目标页面是登录页，且用户已登录，重定向到首页
    if (to.name === 'login' && !isUnauthorized) {
        next('/home');
        return;
    }
    // 如果用户未登录且访问非登录页面，则重定向到登录页
    if (isUnauthorized && to.name !== 'login') {
        next('/login');
        return;
    }
    // 允许其他路由跳转
    next();
});

export default router