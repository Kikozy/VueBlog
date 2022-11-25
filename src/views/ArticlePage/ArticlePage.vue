<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { queryIssuesList, ArticleCardStruc } from "@api/query"
import ArticleCard from "./ArticleCard.vue"
import { useCompState } from "@store/index"
import { data } from "../../../test"

const compState = useCompState()
const state = reactive({
	articleCardList: <Array<ArticleCardStruc>>[],
	pageLoading: true,
})

onMounted(async () => {
	//页面挂载完毕
	setTimeout(() => {
		compState.$state.loading = false
	}, 3000)
	//1. 展示载入动画，等待接口数据的返回

	// const issuesList = await queryIssuesList()
	const issuesList = data
	// console.log(issuesList)
	// debugger
	let res = issuesList.map((element: any, index: number) => {
		let articleDesc = /^(.+)?\r\n\s*(.+)?\r\n/.exec(element.body)
		console.log("看看结果", element)
		return {
			// cover: element.body.match(/!\[(.*?)\]\((.*?)\)/)[2],
			desc: [articleDesc?.[1], articleDesc?.[2]],
			content: element,
		}
	})
	state.articleCardList = res
})

function onEnter(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.transition = `all 1s ease ${Number(el!.dataset!.index) * 0.15}s`
	el.style.opacity = "1"
	el.style.transform = `translateY(0px)`
	done()
}
function onBeforeEnter(el: HTMLElement) {
	el.style.opacity = "0"
	el.style.transform = "translateY(100px)"
}
</script>

<template>
	<div class="article-list">
		<TransitionGroup @enter="onEnter" @before-enter="onBeforeEnter">
			<article-card
				v-for="(cardItem, index) of state.articleCardList"
				:data="cardItem"
				:key="cardItem.content.number"
				:data-index="index"
			/>
		</TransitionGroup>
	</div>
</template>

<style lang="scss" scoped>
.article-list {
	box-sizing: border-box;
	padding: 20px;
	gap: 10px;
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: $bgThemeColor;
}

.article-card-enter-active {
	animation: cardIn 1.5s ease 0s 1;
}

@keyframes cardIn {
	0% {
		opacity: 0;
		transform: translateY(100px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
