<template>
	<div class="loading">
		<div class="mask">
			<img src="../assets/loading.gif" alt="" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10;
	height: 100%;
	width: 100%;
	.mask {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0);
	}
}
</style>
