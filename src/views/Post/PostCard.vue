<script setup lang="ts">
import "highlight.js/styles/foundation.css"
import { PostDetailStruc, PostCardStruc } from "@api/structure/post"
import router from "../../router/index"
import { onMounted, ref } from "vue"

const props = defineProps<{
  data: PostCardStruc
}>()



onMounted(() => {})
</script>

<template>

</template>

<style lang="scss" scoped>

</style>
