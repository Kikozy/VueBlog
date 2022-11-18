<script setup lang="ts"></script>

<template>
	<div class="page">
		<router-view></router-view>
	</div>
</template>

<style lang="scss">
.page {
	margin: auto;
	max-width: 1200px;
}

.nav {
	background-color: rgb(202, 109, 109, 0.6);
}

.content-core {
	max-width: 1200px;
	height: 100vh;
}
</style>
