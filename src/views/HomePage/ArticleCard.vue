<script setup lang="ts">
import 'highlight.js/styles/foundation.css'
import { ArticleCardStruc } from '@api/query'
import TagItem from '@comp/TagItem.vue'
import router from '../../router/index'
import { onMounted, ref } from 'vue'
import { queryIssuesList } from '@api/query'

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
      <header>
        <p class="card-title" @click="hendleOpenArticle(props.articleCardState.number)">
          标题: {{ props.articleCardState.title }}
        </p>
      </header>
      <footer>
        <p class="card-info">
          创建时间: {{ props.articleCardState.created_at }} 最后修改: {{ props.articleCardState.updated_at }}
          <tag-item
            v-for="tag of props.articleCardState.labels"
            @click="handelChooseTag(tag.name)"
            :key="tag.name"
            :color="tag.color"
          >
            {{ tag.name }}
          </tag-item>
          分类: {{ props.articleCardState.milestone.title }}
        </p>
      </footer>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.article-card {
	padding: 20px 0;
  margin-bottom: 5vh;
  border: 2px solid $baseBorderColor;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 5px 12px 4px rgba(0, 0, 0, 0.12);
  .card-title {
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
