import '@/assets/main.css'
import router from "@/router/index.ts";
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts';
const app = createApp(App)

app.use(router)

app.use(ElementPlus)
app.config.globalProperties.$echarts = echarts;
app.use(DataVVue3) // 使用 dataV 插件
app.mount('#app')
