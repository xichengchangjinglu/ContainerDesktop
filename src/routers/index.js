import { createRouter, createWebHashHistory } from 'vue-router'
import Vnc from "../views/Vnc.vue"

const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: Vnc
        }
    ]
})

export default router;