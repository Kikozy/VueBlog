import { createRouter, createWebHistory } from "vue-router"
import { useCompState } from "@store/index"

// const compState = useCompState(pinia)
const Post = () => import("@view/Post/Post.vue")
const PostList = () => import("@view/Post/PostList.vue")
const PostDetails = () => import("@view/Post/PostDetails.vue")
const About = () => import("@view/AboutPage/AboutPage.vue")

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
				component: Post,
				children: [
					{
						path: "List",
						name: "PostList",
						component: PostList,
					},
					{
						path: "Details/:id",
						name: "PostDetails",
						component: PostDetails,
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
	const compState = useCompState()
	console.log("to", to)
	console.log("from", from)
	compState.$state.loading = true
	if (to.name === "ArticleDetails") {
		console.log("是的")
		if (!to.params.id) {
			console.log("奶奶滴不传参数是吧")
			return { name: "Home" }
		}
		next()
	}
	next()
})

export default router
