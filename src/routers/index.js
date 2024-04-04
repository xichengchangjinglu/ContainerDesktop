import { createRouter, createWebHashHistory } from 'vue-router'
import Vnc from "../views/Vnc.vue"
import ContainerManager from "../views/ContainerManager/ContainerManage.vue"
import Login from "../views/Login/Login.vue"
import OperationsPanel from "../views/OperationsPanel/OperationsPanel.vue"
import PersonalProfile from "../views/PersonnalProfile/PersonalProfile.vue"
import ContainerTemplate from "../views/ContainerTemplate/ContainerTemplate.vue"
// Vnc连接测试（正式误用）
import NovncConnect from "../views/NovncConnect/NovncConnect.vue"
import { useTokenStore } from '../stores/useTokenStore.js';
import { ElNotification } from 'element-plus'

const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: Login
        }, 
        {
            path: "/ContainerManager",
            component: ContainerManager,
            meta: { requiresAuth: false }
        },
        {
            path: "/Vnc",
            component: Vnc,
            meta: { requiresAuth: false }
        },
        {
            path: "/OperationsPanel",
            component: OperationsPanel,
            meta: { requiresAuth: false }
        },
        {
            path: "/PersonalProfile",
            component: PersonalProfile,
            meta: { requiresAuth: false }
        },
        {
            path: "/ContainerTemplate",
            component: ContainerTemplate,
            meta: { requiresAuth: false }
        },
        {
            path: "/NovncConnect/:containerIp",
            component: NovncConnect,
            meta: { requiresAuth: false }
        }
    ]
})

const loginError = () => {
    ElNotification({
        title: '登录失效',
        message: '请先登录!',
        type: 'error',
    })
};

router.beforeEach((to, from, next) => {
    const tokenStore = useTokenStore();
    const isAuthenticated = !!tokenStore.getToken();

    if (to.meta.requiresAuth && !isAuthenticated) {
        loginError();
        next('/');
    } else {
        next();
    }
});

export default router;