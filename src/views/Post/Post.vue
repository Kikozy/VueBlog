<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { PostSearchParams, PostCardStruc, TagStruc } from "@api/structure/post"
import { onContentBeforeEnter, onContentEnter } from "@utils/animation"
import { extractIntro } from "@utils/regEx"
import { queryPostCardList } from "@api/interface/post"
import { data } from "../../../test"
import { useCompState } from "@store/index"

const compState = useCompState()
const postState = reactive({
	// 文章列表
	postList: <Array<PostCardStruc>>[],
	// 标签列表
	tagList: <Array<TagStruc>>[],
})

onMounted(() => {
	// postTags.push(...(await queryDocTags()))
	// console.log(await queryDocSort())
	animationLoad([getPostCard], 1000)
})
// 动画载入
async function animationLoad(funGroup: Array<Function>, delay: 1000) {
	for (const funObj of funGroup) {
		if (funObj.constructor.name === "AsyncFunction") {
			//执行异步方法
			await funObj()
		} else {
			//执行同步方法
			funObj()
		}
	}
	setTimeout(() => {
		compState.$state.loading = false
	}, delay)
}

async function getPostCard(params?: PostSearchParams) {
	// let resData = await queryPostCardList()
	const issuesList = data
	postState.postList = issuesList.map((element: any, index: number) => {
		return {
			desc: [...extractIntro(element.body)],
			content: element,
		}
	})
}
</script>
<template>
	<div class="page-post">
		<!-- 列表 -->
		<main class="post-content">
			<TransitionGroup @before-enter="onContentBeforeEnter" @enter="onContentEnter">
				<article-card
					v-for="(cardItem, index) of postState.postList"
					:data="cardItem"
					:key="cardItem.content.number"
					:data-index="index"
				/>
			</TransitionGroup>
		</main>
		<!-- 功能 -->
		<aside class="aside-panel">
			<div class="panel-filter panel-sorts"></div>
			<div class="panel-filter panel-tags">
				<!-- <span class="tag-item" v-for="item of postTags" :key="item.id">{{ item.name }}</span> -->
			</div>
		</aside>
	</div>
</template>

<style lang="scss" scoped>
.page-post {
	display: flex;
	// 侧边栏
	.aside-panel {
		width: 300px;
		height: 600px;
		background-color: pink;
	}
	// 内容区域
	.post-content {
	}
}
.panel-group {
	gap: 10px;
	display: flex;
	flex-direction: column;
	.panel-key-param {
		width: 300px;
		min-height: 100px;
		background-color: $bgThemeColor;
	}
	.panel-sorts {
		gap: 10px;
		display: flex;
		flex-direction: column;
		width: 300px;
		min-height: 100px;
		background-color: $bgThemeColor;
		.sort-item {
			width: 100%;
			border: 1px solid #fff;
		}
	}
	.panel-tags {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		gap: 5px 8px;
		box-sizing: border-box;
		padding: 10px;
		.tag-item {
			display: block;
			box-sizing: border-box;
			padding: 5px;
			text-align: center;
			border-radius: 5px;
			border: 1px solid $borderSecondaryColor;
		}
	}
}
</style>
