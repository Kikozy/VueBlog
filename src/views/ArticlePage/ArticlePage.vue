<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { queryIssuesList, ArticleCardStruc } from "@api/query"
import ArticleCard from "./ArticleCard.vue"

const state = reactive({
	articleCardList: <Array<ArticleCardStruc>>[],
	pageLoading: true,
})

onMounted(async () => {
	//页面挂载完毕

	//1. 展示载入动画，等待接口数据的返回

	const issuesList = await queryIssuesList()
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
</script>

<template>
	<div class="article-list">
		<article-card v-for="cardItem of state.articleCardList" :data="cardItem" :key="cardItem.content.number" />
	</div>
</template>

<style lang="scss">
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
</style>
