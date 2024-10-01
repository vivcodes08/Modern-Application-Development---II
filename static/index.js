import { createApp } from 'vue'
import { createRouter ,createWebHistory} from 'vue-router'
import routes from './routes.js'

const app=createApp({
    template:`
    <router-view>
    </router-view>
    `
})

app.use(createRouter({
    history:createWebHistory(),
    routes:routes
}))

document.addEventListener('DOMContentLoaded',()=>{app.mount('#app')})