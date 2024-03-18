import { createRouter, createWebHashHistory } from 'vue-router'
import Vnc from "../views/Vnc.vue"
import ContainerManager from "../views/ContainerManager/ContainerManage.vue"
import Login from "../views/Login/Login.vue"

const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: Login
        },
        {
            path: "/ContainerManager",
            component: ContainerManager
        },
        {
            path: "/Vnc",
            component: Vnc
        }
    ]
})

export default router;