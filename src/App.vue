<script setup lang="ts">
import Loading from "@comp/Loading.vue"
import { useCompState } from "@store/index"
import { onCompLeave, onCompBeforeEnter, onCompEnter, onCompBeforeLeave } from "@utils/animation"

const compState = useCompState()

</script>

<template>
	<div class="container">
		<div class="container-core">
			<Transition
				@before-enter="onCompBeforeEnter"
				@enter="onCompEnter"
				@before-leave="onCompBeforeLeave"
				@leave="onCompLeave"
				:css="false"
			>
				<Loading v-if="compState.$state.loading"/>
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
