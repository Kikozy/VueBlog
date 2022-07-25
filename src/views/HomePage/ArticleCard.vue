<script setup lang="ts">
import 'highlight.js/styles/foundation.css'
import { ArticleCardStruc } from '@api/query'
import TagItem from '@comp/TagItem.vue'
import router from '../../router/index'
import { onMounted, ref } from 'vue';


const props = defineProps<{
	articleCardState: ArticleCardStruc
}>()

const cardShow = ref(false)

onMounted(() => {
	cardShow.value = true
})

//打开详情
function hendleOpenArticle(cardNum: number) {
	router.push({ path: `/ArticleDetails/${cardNum}` })
}
</script>

<template>
	<transition name="article-card">
		<div class="article-card" v-if="cardShow">
			<header>
				<p class="card-title" @click="hendleOpenArticle(props.articleCardState.number)">标题: {{
						props.articleCardState.title
				}}</p>
			</header>
			<footer>
				<p class="card-info">
					创建时间: {{ props.articleCardState.created_at }} 最后修改: {{ props.articleCardState.updated_at }}
					<tag-item v-for="tag of props.articleCardState.labels" :name="tag.name" :color="tag.color"
						:key="tag.name">
					</tag-item>
					分类: {{ props.articleCardState.milestone.title }}
				</p>
			</footer>
		</div>
	</transition>


</template>


<style lang="scss" scoped>
.article-card {
	border: 2px solid rgb(232, 217, 208);

	.card-title {
		color: orange;
		cursor: pointer;
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