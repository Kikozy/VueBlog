import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@view/HomePage/HomePage.vue')
    },
    {
        path: '/About',
        component: () => import('@view/AboutPage/AboutPage.vue')
    },
    {
        path: '/ArticleDetails/:id',
        component: () => import('@view/ArticleDetails/ArticleDetails.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router