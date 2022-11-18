<script setup lang="ts"></script>

<template>
	<div class="home-page">
		<header>
			<nav class="nav">
				<router-link to="/">Home</router-link> | <router-link to="/About">About</router-link> |
				<!-- <router-link to="/">Home</router-link> | -->
			</nav>
		</header>
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<style lang="scss">
.page {
	margin: auto;
	max-width: 1200px;
}

.nav {
	background-color: pink;
}

.content-core {
	max-width: 1200px;
	height: 100vh;
}
</style>
