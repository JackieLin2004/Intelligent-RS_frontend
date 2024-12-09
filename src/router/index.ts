import {createRouter, createWebHashHistory} from 'vue-router'

import Login from "@/views/Login.vue";

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
            path: '/',
            redirect: '/login'
        }
    ]
})

export default router