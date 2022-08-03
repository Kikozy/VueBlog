<script setup lang="ts">
import { onMounted, reactive, render, setTransitionHooks, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import lightCode from 'highlight.js'

import { queryIssuesContent } from '@api/query'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

const route = useRoute()

const articleState = reactive({
  title: '', //文章标题
  articleId: route.params.id as string, //文章ID
  body: '', //文章内容
  imgCount: 0, //图片计数
})
const markdownToHtml = shallowRef('')
queryIssuesContent(articleState.articleId).then((res) => {
  articleState.body = res.body
  articleState.title = res.title
  markdownToHtml.value = marked(res.body)
  console.error(articleState.title)
  const gitalk = new Gitalk({
    clientID: '8b668e751557fa12e756',
    clientSecret: 'd53f9164f3903a88da2a59423ab4a5115826da22',
    repo: 'test-blog-comment',
    owner: 'Kikozy',
    admin: ['Kikozy'],
    language: 'zh-CN',
    distractionFreeMode: false,
    title: articleState.title,
    labels: ['评论'],
  })
  gitalk.render('gitalk-container')
})

//创建MD渲染器
const rendererMD = new marked.Renderer()
//图片样式
rendererMD.image = (href, text) => {
  let imgId = 'img' + ++articleState.imgCount
  let tempImg = new Image()
  tempImg.src = href ? href : ''
  tempImg.onload = function () {
    let dom_img = document.querySelector(`#${imgId}`) as HTMLImageElement
    let dom_loading = document.querySelector(`#${imgId}-loading`) as HTMLDivElement
    dom_loading.style.display = 'none'
    dom_img.src = href!
    dom_img.style.opacity = '1'
    console.log('我已载入', dom_img)
  }
  return `
    <div class="img-box">
      <div id="${imgId}-loading" class="img-loading"></div>
      <img id="${imgId}" class="img-md" src=""  data-src="${href}" alt="${text}">
    </div>
  `
}

//lin样式
rendererMD.link = (href, title, text) => {
  return `<a class="link-md" href="${href}">${text}</a>`
}
//标题 ## 样式
rendererMD.heading = (text, level) => {
  return `<h${level}>${text}</h1>`
}
//引用 > 样式
rendererMD.blockquote = (quote) => {
  return `<blockquote class="quote-md">${quote}</blockquote>`
}
//小代码块 `` 样式
rendererMD.codespan = (code) => {
  return `<code class="code-md">${code}</code>`
}
rendererMD.code = function (code, infostring) {
  // let lang = infostring ? infostring : ''
  // console.log('这是什么呀', code)
  let colorCode = (this as any).options.highlight(code, infostring)
  return `<pre class="code-area-md"><code >${colorCode}</code>`
}

marked.setOptions({
  renderer: rendererMD,
  breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
  sanitize: true, //对输出进行过滤（清理）
  smartLists: true,
  smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: (code) => lightCode.highlightAuto(code).value,
})

onMounted(() => {
  console.log(document.querySelectorAll('.code-area-md span'))
})
</script>

<template>
  <div class="articleDetails">
    <div v-html="markdownToHtml" class="markdown-body"></div>
  </div>
  <div>
    <!-- 评论 -->
    <div id="gitalk-container"></div>
  </div>
</template>

<style lang="scss">
@import 'highlight.js/styles/atom-one-dark.css';

body {
  background-color: rgb(24, 24, 28);
}
// 引用 > 样式
.quote-md {
  margin: 0;
  padding: 30px 10px;
  // background-color: #dddddd;
  position: relative;

  &::before {
    content: '<';
    position: absolute;
    top: 3px;
    left: 5px;
  }

  &::after {
    content: '>';
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
    content: '';
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
    background-color: #ffffff;
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
    background-color: #dddddd;
  }
}

//小代码块
.code-md {
  border-radius: 3px;
  padding: 3px;
  color: $linkTagColor;
}
//
.code-area-md {
  background-color: rgb(35, 39, 46) !important;
}

.img-box {
  width: 100%;
  max-height: 700px;
  overflow: hidden;
}

//图片
.img-md {
  width: 100%;
  object-fit: scale-down;
  opacity: 0;
  transition: 1s;
}

.img-loading {
  margin: 100px auto;
  height: 32px;
  width: 32px;
  background-image: url('../../assets/loading.gif');
}

//评论卡片
.gt-container .gt-comment-admin .gt-comment-content {
  background-color: rgb(24, 24, 28);
  border: 2px solid $baseBorderColor;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 5px 12px 4px rgba(0, 0, 0, 0.12);
}
.gt-container .gt-header-textarea:hover {
  background-color: rgb(24, 24, 28);
}
//gittalk 编辑卡片
.gt-container .gt-header-textarea {
  background-color: rgb(24, 24, 28);
  border: 2px solid $baseBorderColor;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18), 0 5px 12px 4px rgba(0, 0, 0, 0.12);
}

//按钮
.gt-container .gt-btn {
  background-color: rgba(99, 226, 183, 0.16);
  border: none;
  //文本
  .gt-btn-text {
    color: $primaryTextColor;
  }
  &:hover {
    background-color: $primaryBgColorHover;
  }
}

//预览按钮
.gt-container .gt-btn-preview {
  background-color: $defaultBtnBgColor;
  border: none;
  &:hover {
    background-color: $defaultBtnBgColorHover;
  }
  //文本
  .gt-btn-text {
    color: $baseTextColor;
  }
}
</style>
