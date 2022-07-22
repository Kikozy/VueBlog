<script setup lang="ts">
import 'highlight.js/styles/foundation.css'
import { ArticleCardStruc } from '@api/query'
import TagItem from '@comp/TagItem.vue'
import router from '../../router/index'

//打开详情
function hendelOpenArticle(cardNum: number) {
	router.push({ path: `/ArticleDetails/${cardNum}` })
}

const props = defineProps<{
	articleCardState: ArticleCardStruc
}>()

</script>

<template>
	<div class="article-card">
		<header>
			<p class="card-title" @click="hendelOpenArticle(props.articleCardState.number)">标题: {{
					props.articleCardState.title
			}}</p>
		</header>
		<footer>
			<p class="card-info">
				创建时间: {{ props.articleCardState.created_at }} 最后修改: {{ props.articleCardState.updated_at }}
				<tag-item v-for="tag of props.articleCardState.labels" :name="tag.name" :color="tag.color" :key="tag.name">
				</tag-item>
				分类: {{ props.articleCardState.milestone.title }}
			</p>
		</footer>
	</div>

</template>


<style lang="scss" scoped>
.article-card {
	border: 2px solid rgb(232, 217, 208);

	.card-title {
		color: orange;
		cursor: pointer;
	}
}
</style>