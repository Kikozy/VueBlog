<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { PostSearchParams, PostCardStruc, TagStruc } from "@api/structure/post"
import { onContentBeforeEnter, onContentEnter } from "@utils/animation"
import { extractIntro } from "@utils/regEx"
import { data } from "../../../test"
import { useCompState } from "@store/index"
import PostCard from "./PostCard.vue"

const compState = useCompState()
const postState = reactive({
	// 文章列表
	postList: <Array<PostCardStruc>>[],
	// 标签列表
	tagList: <Array<TagStruc>>[],
})

onMounted(async () => {
	// postTags.push(...(await queryDocTags()))
	// console.log(await queryDocSort())
	animationLoad([getPostCard], 1000)
	// await getPostCard()
	// compState.$state.loading = false
})
// 动画载入
async function animationLoad(funGroup: Array<Function>, delay: number = 1000) {
	for (const funItem of funGroup) {
		if (funItem.constructor.name === "AsyncFunction") {
			await funItem()
		} else {
			funItem()
		}
	}
	setTimeout(() => {
		compState.$state.loading = false
		console.log(compState.$state.loading)
	}, 1000)
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
		<div class="page-post-list">
			<TransitionGroup @before-enter="onContentBeforeEnter" @enter="onContentEnter">
				<post-card
					v-for="(cardItem, index) of postState.postList"
					:data="cardItem"
					:key="cardItem.content.number"
					:data-index="index"
				/>
			</TransitionGroup>
		</div>
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
