<script setup lang="ts">
import { onMounted, reactive, ref, VueElement } from "vue"
import { PostSearchParams, PostCardStruc, TagStruc } from "@api/structure/post"
import { onContentBeforeEnter, onContentEnter } from "@utils/animation"
import { extractIntro } from "@utils/regEx"
import { queryPostCardList } from "@api/interface/post"
import { data } from "../../../test"
import { useCompState } from "@store/index"
import PostDetails from "./PostDetails.vue"
import PostList from "./PostList.vue"
import Loading from "@comp/Loading.vue"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { onCompLeave, onCompBeforeEnter, onCompEnter, onCompBeforeLeave } from "@utils/animation"

const route = useRoute()
const compState = useCompState()
// 组件组
const compoGroup: any = {
	PostDetails,
	PostList,
}
// 当前要展示的组件
const contentComponent = ref("")

onMounted(() => {
	contentComponent.value = String(route.name)
	console.log("当前路由", contentComponent.value)
	compState.$state.loading = true
})

// 监听路由跳转
onBeforeRouteUpdate((to) => {
	contentComponent.value = String(to.name)
})

//返回当前选中的组件
function getNowComp(): VueElement {
	return compoGroup[contentComponent.value]
}
</script>
<template>
	<div class="page-post">
		<main class="post-content">
			<Transition
				@before-enter="onCompBeforeEnter"
				@enter="onCompEnter"
				@before-leave="onCompBeforeLeave"
				@leave="onCompLeave"
				:css="false"
			>
				<Loading v-if="compState.$state.loading" />
			</Transition>
			<component :is="getNowComp()" />
		</main>
		<!-- 功能 -->
		<aside class="aside-panel">
			<div class="panel-filter panel-sorts">
				<input type="text" placeholder="233" :style="{ color: 'red' }" />
			</div>
			<div class="panel-filter panel-tags">
				<!-- <span class="tag-item" v-for="item of postTags" :key="item.id">{{ item.name }}</span> -->
			</div>
		</aside>
	</div>
</template>

<style lang="scss" scoped>
.page-post {
	display: flex;
	// 侧边栏
	.aside-panel {
		width: 300px;
		height: 600px;
		background-color: pink;
	}
	// 内容区域
	.post-content {
	}
}
.panel-group {
	gap: 10px;
	display: flex;
	flex-direction: column;
	.panel-key-param {
		width: 300px;
		min-height: 100px;
		background-color: $bgThemeColor;
	}
	.panel-sorts {
		gap: 10px;
		display: flex;
		flex-direction: column;
		width: 300px;
		min-height: 100px;
		background-color: $bgThemeColor;
		.sort-item {
			width: 100%;
			border: 1px solid #fff;
		}
	}
	.panel-tags {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		gap: 5px 8px;
		box-sizing: border-box;
		padding: 10px;
		.tag-item {
			display: block;
			box-sizing: border-box;
			padding: 5px;
			text-align: center;
			border-radius: 5px;
			border: 1px solid $borderSecondaryColor;
		}
	}
}
</style>
