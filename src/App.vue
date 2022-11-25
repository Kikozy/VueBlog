<script setup lang="ts">
import Loading from "@comp/Loading.vue"
import { useCompState } from "@store/index"

const compState = useCompState()


</script>

<template>
	<div class="container">
		<div class="container-core">
			<Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
				<Loading v-if="compState.$state.loading" />
			</Transition>
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss">
@import "@assets/base.scss";

.container {
	width: 100%;
	min-height: 100vh;
	background-color: $bgThemeColor;
	&-core {
		position: relative;
		max-width: 1200px;
		height: 100vh;
	}
}
</style>
