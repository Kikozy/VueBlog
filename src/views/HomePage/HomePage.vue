<script setup lang="ts">
import { reactive } from 'vue'
import 'highlight.js/styles/foundation.css'
import { queryIssuesList, Card } from '@api/query'
import TagItem from '@comp/TagItem.vue'
import router from '../../router/index'

const state = reactive({
  cardList: <Array<Card>>[]
})

queryIssuesList().then((res: any) => {
  state.cardList = res
})

//打开详情
function hendelOpenArticle(cardNum: number) {
  router.push({ path: `/ArticleDetails/${cardNum}` })
}

</script>

<template>
  <div class="card" v-for="card of state.cardList" :key="card.title">
    <header>
      <p class="card-title" @click="hendelOpenArticle(card.number)">标题: {{ card.title }}</p>
    </header>
    <footer>
      <p class="card-info">
        创建时间: {{ card.created_at }} 最后修改: {{ card.updated_at }}
        <tag-item v-for="tag of card.labels" :name="tag.name" :color="tag.color" :key="tag.name"></tag-item>
        分类: {{ card.milestone.title }}
      </p>
    </footer>
  </div>
</template>


<style lang="scss">
.card {
  border: 2px solid rgb(232, 217, 208);

  .card-title {
    color: orange;
  }
}
</style>