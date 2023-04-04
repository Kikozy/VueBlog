<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { PostSearchParams, PostCardStruc, TagStruc } from "@api/structure/post"
import { onContentBeforeEnter, onContentEnter } from "@utils/animation"
import { extractIntro } from "@utils/regEx"
// 模拟数据
import { data } from "../../../test"
import { useCompState } from "@store/index"
import PostCard from "./PostCard.vue"
import router from "@router/index"

const compState = useCompState()

const postListState = reactive({
  //文章列表
  postList: <Array<PostCardStruc>>[],
  //分类列表(取消)
  //标签列表(取消)
})

onMounted(async () => {
  queueTasks([getPostList], 0, "文章列表初始化")
})

//队列任务
function queueTasks(funGroup: Array<Function>, delay: number = 1000, eventName?: String) {
  setTimeout(async () => {
    for (const funItem of funGroup) {
      if (funItem.constructor.name === "AsyncFunction") {
        await funItem()
      } else {
        funItem()
      }
    }
    if (eventName) console.log(`队列任务："${eventName}" 处理完成!`)
  }, delay)
}

//加载文章列表
async function getPostList(params?: PostSearchParams) {
  // let resData = await queryPostCardList()
  const issuesList = data
  //提取文章中所需要的内容 预览内容 + 内容
  postListState.postList = issuesList.map((element: any, index: number) => {
    return {
      desc: [...extractIntro(element.body)],
      content: element,
    }
  })
  console.log("文章列表加载完毕", postListState.postList)
}

//打开详情
function hendleOpenArticle(cardNum: number) {
  router.push({ path: "Detail", query: { postId: cardNum } })
}
</script>
<template>
  <div class="page-post">
    <!-- 列表 -->
    <div class="page-post-list">
      <TransitionGroup
        @before-enter="(el)=>onContentBeforeEnter(el as HTMLElement)"
        @enter="(el,done)=>onContentEnter(el as HTMLElement,done)"
      >
        <div
          class="post-card"
          v-for="(cardItem, index) of postListState.postList"
          :key="index"
          @click="hendleOpenArticle(cardItem.content.number)"
        >
          <div class="post-top-bar">
            <span class="info-item info-date">
              <img class="img-icon" src="@icon/date.svg" alt="icon-date" />
              2020,10月13日
            </span>
            <span class="info-item info-view-count">
              <img class="img-icon" src="@icon/xiangji.svg" alt="icon-view" />
              1553次浏览
            </span>
            <span class="info-item info-sort">
              <img class="img-icon" src="@icon/sort.svg" alt="icon-sort" />
              Vue
            </span>
          </div>
          <!-- 文章标题 -->
          <p class="post-title">
            {{ cardItem.content.title }}
          </p>
          <div class="post-desc" v-for="descItem of cardItem.desc">
            {{ descItem }}
          </div>
          <!-- 文章信息 -->
          <div class="post-info">
            <!-- 文章标签 -->
            <div class="post-tags">
              <div class="tag-item"><img class="img-icon" src="@icon/tag.svg" alt="" />测试1</div>
              <div class="tag-item"><img class="img-icon" src="@icon/tag.svg" alt="" />测试2</div>
              <div class="tag-item"><img class="img-icon" src="@icon/tag.svg" alt="" />测试3</div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <button>阅读更多</button>
  </div>
</template>

<style lang="scss" scoped>
.page-post {
  display: flex;
  .post-card {
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px 5px 0 0;
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
      .info-item {
        margin-right: 10px;
        display: flex;
        align-items: center;
        .img-icon {
          margin-right: 5px;
          height: 16px;
          width: 16px;
        }
      }
    }

    .post-title {
      font-size: 20px;
    }
    .post-desc {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px;
      max-height: 100px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 20px;
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
          .img-icon {
            width: 16px;
            width: 16px;
          }
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
}
</style>
