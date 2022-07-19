<script setup lang="ts">
import { queryDocList, queryDocTags, queryDocSort } from './api/query'
import Tags from './views/Tags/index.vue';

// queryDocList().then(res => console.log('文档列表', res))
// queryDocTags().then(res => console.log('文档标签', res))
// queryDocSort().then(res => console.log('文档分类', res))

</script>

<template>
    <Tags></Tags>
</template>

<style scoped>
</style>
