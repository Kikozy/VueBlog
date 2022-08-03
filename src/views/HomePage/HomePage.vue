<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { queryIssuesList, ArticleCardStruc } from "@api/query"
import ArticleCard from "./ArticleCard.vue"

const state = reactive({
  cardList: <Array<ArticleCardStruc>>[],
  pageLoading: true,
})

onMounted(() => {
  //页面挂载完毕

  //1. 展示载入动画，等待接口数据的返回

  queryIssuesList().then((res: any) => {
    state.cardList = res
  })
})
</script>

<template>
  <div class="article-list">
    <article-card v-for="cardItem of state.cardList" :article-card-state="cardItem" :key="cardItem.number" />
  </div>
</template>

<style lang="scss">
.article-list {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(24, 24, 28);
}
</style>
