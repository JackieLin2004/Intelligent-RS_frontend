import router from "@/router/index.ts";

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
