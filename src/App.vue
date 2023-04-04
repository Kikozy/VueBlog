<script setup lang="ts">
import Loading from "@comp/Loading.vue"
import { useCompState } from "@store/index"
import { onCompLeave, onCompBeforeEnter, onCompEnter, onCompBeforeLeave } from "@utils/animation"

const compState = useCompState()

</script>

<template>
	<div class="container">
		<nav class="global-navigation">
			<div class="nav-item">
				<img class="img-icon" src="@icon/post.svg" alt="icon-post">
			</div>
			<div class="nav-item">
				<img class="img-icon" src="@icon/album.svg" alt="icon-album">
			</div>
			<div class="nav-item">
				<img class="img-icon" src="@icon/link.svg" alt="icon-link">
			</div>
			<div class="nav-item">
				<img class="img-icon" src="@icon/xiangji.svg" alt="icon-xiangji">
			</div>
		</nav>
		<div class="container-core">
			<!-- <Transition
				@before-enter="onCompBeforeEnter"
				@enter="onCompEnter"
				@before-leave="onCompBeforeLeave"
				@leave="onCompLeave"
				:css="false"
			>
				<Loading v-if="compState.$state.loading"/>
			</Transition> -->
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss">
@import "@assets/base.scss";

.container {
	box-sizing: border-box;
	padding: 20px;
	width: 100%;
	min-height: 100vh;
	background-color: $bgThemeColor;
	display: flex;
	align-items: center;
	flex-direction: column;
	&-core {
		position: relative;
		width: 1000px;
		height: 100vh;
	}
	// 全局导航栏样式
	.global-navigation {
		display: flex;
		justify-content: center;
		.nav-item {
			margin-right: 10px;
			.img-icon {
				height: 24px;
				width: 24px;
			}
		}
	}
}
</style>
