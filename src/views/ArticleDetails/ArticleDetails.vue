<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import lightCode from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import { queryIssuesContent } from '@api/query'

const route = useRoute()

const articleState = reactive({
  articleId: route.params.id as string,
  body: ''
})
const markdownToHtml = shallowRef('')
queryIssuesContent(articleState.articleId).then((res) => {
  articleState.body = res.body
  markdownToHtml.value = marked(res.body)
})

//创建MD渲染器
const rendererMD = new marked.Renderer()
//图片样式
rendererMD.image = (href, text) => {
  return `<img src=${href} alt=${text}>`
}

//lin样式
rendererMD.link = (href, title, text) => {
  return `<a class='link-md' href="${href}">${text}</a>`
}
//标题 ## 样式
rendererMD.heading = (text, level) => {
  return `<h${level}>${text}</h1>`
}
//引用 > 样式
rendererMD.blockquote = (quote) => {
  return `<blockquote class='quote-md'>${quote}</blockquote>`
}
//小代码块 `` 样式
rendererMD.codespan = (code) => {
  return `<code class='code-md'>${code}</code>`
}

marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  pedantic: false,
  sanitize: false,
  highlight: (code, lang) => {
    if (!lang) return
    return lightCode.highlight(code, { language: lang }).value
  },
})


</script>

<template>
  <div v-html="markdownToHtml" class="markdown-body"></div>
</template>


<style lang="scss">
// 引用 > 样式
.quote-md {
  margin: 0;
  padding: 30px 10px;
  background-color: #DDDDDD;
  position: relative;

  &::before {
    content: "<";
    position: absolute;
    top: 3px;
    left: 5px;
  }

  &::after {
    content: ">";
    position: absolute;
    bottom: 3px;
    right: 5px;
  }
}

//超链接样式
.link-md {
  // display: inline-block;
  position: relative;
  text-decoration: none;
  color: $linkTagColor;
  transition: 0.5s;

  //下划线
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 2px;
    width: 100%;
    transform: scaleX(0);
    background-color: $linkTagColor;
    transition: 0.3s;
    transform-origin: left;
  }

  //tag
  &::after {
    content: attr(href);
    position: absolute;
    top: -100%;
    left: 50%;
    height: 100%;
    color: #cad2c5;
    font-size: 12px;
    white-space: nowrap;
    background-color: #FFFFFF;
    opacity: 0;
    transition: 0.2s;
    transform: scaleY(0);
    transform-origin: bottom;
    border: 1px solid black;
  }

  //下划线效果
  &:hover::before {
    transform: scaleX(1);
  }

  //tag展开效果
  &:hover::after {
    opacity: 1;
    transform: scaleY(1);
  }

  //背景色效果
  &:hover {
    background-color: #DDDDDD;
  }
}

//小代码块
.code-md {
  border-radius: 3px;
  padding: 3px;
  background-color: rgb(223, 225, 229);
  color: $linkTagColor;
}
</style>