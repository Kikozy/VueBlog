import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@view/Home/index.vue')
    },
    {
        path: '/About',
        component: () => import('@view/About/index.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router