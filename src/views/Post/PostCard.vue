<script setup lang="ts">
import "highlight.js/styles/foundation.css"
import { PostDetailStruc, PostCardStruc } from "@api/structure/post"
import router from "../../router/index"
import { onMounted, ref } from "vue"

const props = defineProps<{
	data: PostCardStruc
}>()

//打开详情
function hendleOpenArticle(cardNum: number) {
	router.push({ name: "PostDetails", params: { id: cardNum } })
	// router.push({ path: `/Post/Details/${cardNum}` })
}

onMounted(() => {})
</script>

<template>
	<div class="post-card">
		<div class="post-top-bar">
			<span class="post-time">2020,10月13日</span>/ <span>1553次浏览</span>/ <span>Vue</span>/
		</div>
		<!-- 文章标题 -->
		<p class="post-title" @click="hendleOpenArticle(props.data.content.number)">
			{{ props.data.content.title }}
		</p>
		<div class="post-desc">
			<p class="post-item" v-for="descItem of props.data.desc">{{ descItem }}</p>
		</div>
		<!-- 文章信息 -->
		<div class="post-info">
			<!-- 文章标签 -->
			<div class="post-tags">
				<div class="tag-item">测试1</div>
				<div class="tag-item">测试2</div>
				<div class="tag-item">测试3</div>
			</div>
			<div class="post-edit-time">最后修改: {{ new Date(props.data.content.updated_at).toLocaleDateString() }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.post-card {
	box-sizing: border-box;
	padding: 10px;
	display: flex;
	flex-direction: column;
	width: 800px;
	border-radius: 5px 5px 0 0;
	border-bottom: 1px solid $borderSecondaryColor;
	color: $textThemeColor;
	transition: ease-in-out 0.5s;
	&:hover {
		background-color: $bgFocusColor;
		cursor: pointer;
		.article-title {
			color: $baseHoverColor;
		}
	}
	.post-top-bar {
		display: flex;
		font-size: 12px;
		color: $textSecondaryColor;
	}

	.post-title {
		font-size: 20px;
	}
	.post-desc {
		margin-top: 10px;
		box-sizing: border-box;
		padding: 10px;
		height: 100px;
		overflow: hidden;
		.desc-item {
			font-size: 14px;
		}
	}

	.post-info {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: $textSecondaryColor;
		.post-tags {
			display: flex;
			gap: 8px;
			.tag-item {
				border-radius: 3px;
				cursor: pointer;
				padding: 2px 5px;
				border: 1px solid $borderSecondaryColor;
				transition: ease-in-out 0.5s;
			}
		}
		.post-edit-time {
		}
	}
	.btn-view {
		border: 0;
		outline: none;
		width: 100px;
		background-color: $bgFocusColor;
		border-radius: 3px;
		transition: ease-in-out 0.5s;
		border: 1px solid $borderSecondaryColor;
		&:hover {
			box-shadow: -1px 0 10px 1px rgba(#63e2b7, 0.5), 0px -1px 10px 1px rgba(#53ccb1, 0.5),
				1px 0 10px 1px rgba(#44b6aa, 0.5), 0 1px 10px 1px rgba(#34a0a4, 0.5);
		}
	}
}
</style>
