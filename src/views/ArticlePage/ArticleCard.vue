<script setup lang="ts">
import "highlight.js/styles/foundation.css"
import { ArticleCardStruc } from "@api/query"
import TagItem from "@comp/TagItem.vue"
import router from "../../router/index"
import { onMounted, ref } from "vue"
import { queryIssuesList } from "@api/query"

const props = defineProps<{
	data: ArticleCardStruc
}>()

const cardShow = ref(false)

//打开详情
function hendleOpenArticle(cardNum: number) {
	router.push({ name: "ArticleDetails", params: { id: cardNum } })
}

/**
 * 标签点击事件
 * @param tagName tag的名字
 */
function handelChooseTag(tagName: string) {
	queryIssuesList({ labels: tagName })
}
onMounted(() => {
	cardShow.value = true
})
</script>

<template>
	<transition name="article-card">
		<div class="article-card" v-if="cardShow">
			<div class="article-top-bar">
				<span class="article-time">2020,10月13日</span>/ <span>1553次浏览</span>/ <span>Vue</span>/
			</div>
			<!-- 文章标题 -->
			<p class="article-title" @click="hendleOpenArticle(props.data.content.number)">
				{{ props.data.content.title }}
			</p>
			<div class="article-desc">
				<p class="desc-item" v-for="descItem of props.data.desc">{{ descItem }}</p>
			</div>
			<!-- 文章信息 -->
			<div class="article-info">
				<!-- 文章标签 -->
				<div class="article-tags">
					<div class="tag-item">测试1</div>
					<div class="tag-item">测试2</div>
					<div class="tag-item">测试3</div>
				</div>
				<div class="article-edit-time">
					最后修改: {{ new Date(props.data.content.updated_at).toLocaleDateString() }}
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
.article-card {
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
	.article-top-bar {
		display: flex;
		font-size: 12px;
		color: $textSecondaryColor;
	}

	.article-title {
		font-size: 20px;
	}
	.article-desc {
		margin-top: 10px;
		box-sizing: border-box;
		padding: 10px;
		height: 100px;
		overflow: hidden;
		.desc-item {
			font-size: 14px;
		}
	}

	.article-info {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: $textSecondaryColor;
		.article-tags {
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
		.article-edit-time {
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

.article-card-enter-active {
	animation: cardIn 1.5s ease;
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
