import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@view/HomePage/HomePage.vue")
const Article = () => import("@view/ArticlePage/ArticlePage.vue")
const ArticleDetails = () => import("@view/ArticleDetails/ArticleDetails.vue")
const About = () => import("@view/AboutPage/AboutPage.vue")

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		children: [
			{
				path: "",
				redirect: "/Article",
			},
			{
				path: "/Article",
				component: Article,
			},
			{
				path: "/Article/Details/:id?",
				name: "ArticleDetails",
				component: ArticleDetails,
			},
			{
				path: "/About",
				component: About,
			},
		],
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
router.beforeEach((to, from, next) => {
	console.log("to", to)
	console.log("from", from)
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
