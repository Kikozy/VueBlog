<script setup lang="ts">
import { queryIssuesList } from '@api/query'


const props = defineProps<{
  name: string,
  color?: string,
  link?: string
}>()

/**
 * 
 * @param tagName tag的名字
*/
function handelChooseTag(tagName: string) {
  queryIssuesList({ labels: tagName })
}

</script>
<template>
  <span class="tag-item" :style="{ color: `#${props.color}` }" @click="handelChooseTag(props.name)">
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
