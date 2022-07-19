<script setup lang="ts">

const props = defineProps<{
  name: string,
  color: string,
  link: string
}>()

</script>
<template>
  <span class="tag-item" :style="{ color: `#${props.color}` }">
    {{ props.name }}
  </span>
</template>

<style scoped>
.tag-item {
  margin: 0 2px;
  box-sizing: border-box;
  display: inline-block;
  padding: 5px;
  background-color: rgba(151, 151, 151, 0.622);
}
</style>
