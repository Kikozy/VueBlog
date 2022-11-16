<script setup lang="ts">
import "highlight.js/styles/foundation.css"
import { ArticleCardStruc } from "@api/query"
import TagItem from "@comp/TagItem.vue"
import router from "../../router/index"
import { onMounted, ref } from "vue"
import { queryIssuesList } from "@api/query"

const props = defineProps<{
	articleCardState: ArticleCardStruc
}>()

const cardShow = ref(false)

//打开详情
function hendleOpenArticle(cardNum: number) {
	router.push({ path: `/ArticleDetails/${cardNum}` })
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
			<div class="card-img">
				<img src="" alt="" />
			</div>
			<!-- 文章信息 -->
			<div class="article-info">
				<!-- 文章标题 -->
				<p class="article-title" @click="hendleOpenArticle(props.articleCardState.number)">
					标题: {{ props.articleCardState.title }}
				</p>
				<!-- 文章时间 -->
				<p class="article-time">
					创建时间: {{ new Date(props.articleCardState.created_at).toLocaleDateString() }} 最后修改:
					{{ new Date(props.articleCardState.updated_at).toLocaleDateString() }}
				</p>
				<!-- 文章标签 -->
				<div class="article-tags">
					<tag-item
						v-for="tag of props.articleCardState.labels"
						@click="handelChooseTag(tag.name)"
						:key="tag.name"
						:color="tag.color"
					>
						{{ tag.name }}
					</tag-item>
				</div>
				<!-- 文章分类 -->
				<div class="article-sort">分类: {{ props.articleCardState.milestone.title }}</div>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
.article-card {
	width: 30%;
	max-width: 380px;
	height: 300px;
	margin-bottom: 5vh;
	border: 2px solid $baseBorderColor;
	box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 5px 12px 4px rgba(0, 0, 0, 0.12);
	.card-img {
		width: 100%;
		height: 200px;
		background-color: pink;
	}
	.article-info {
		display: flex;
		flex-direction: column;
		.article-title {
			font-size: 20px;
		}
		.article-time {
			font-size: 14px;
		}
    .article-tags {
      
    }
    .article-sort{
      font-size: 14px;
    }
	}
	.card-title {
		box-sizing: border-box;
		padding: 0 10px;
		color: $baseTextColor;
		cursor: pointer;
		&:hover {
			color: $baseHoverColor;
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
