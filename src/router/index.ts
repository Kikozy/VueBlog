import { createRouter, createWebHistory } from "vue-router"
import { useCompState } from "@store/index"

// const compState = useCompState(pinia)
const PostHome = () => import("@view/Post/PostHome.vue")
const PostList = () => import("@view/Post/PostList.vue")
const PostDetail = () => import("@view/Post/PostDetail.vue")

const routes = [
	{
		path: "/",
		name: "Root",
		redirect: "Post",
		children: [
			{
				path: "Post",
				name: "Post",
				redirect: "Post/List",
				component: PostHome,
				children: [
					{
						path: "List",
						name: "PostList",
						component: PostList,
					},
					{
						path: "Detail",
						name: "PostDetail",
						component: PostDetail,
					},
				],
			},
		],
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
router.beforeEach((to, from, next) => {
	console.log("from", from)
	console.log("to", to)
	next()
})

export default router
