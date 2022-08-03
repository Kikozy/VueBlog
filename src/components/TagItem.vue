<script setup lang="ts">
//withDefaults 作用是给defineProps绑定默认值的api
const props = withDefaults(
  defineProps<{
    color?: string //颜色
    link?: string //链接
    size?: "small" | "medium" | "large" //大小 小/中/大
    round?: boolean
    strong?: boolean
    text?: boolean
  }>(),
  {
    size: "medium",
    round: false,
    strong: false,
    text: false,
  }
)
</script>
<template>
  <span
    class="tag-item"
    :class="{
      'is-round': props.round,
      'is-strong': props.strong,
      'is-text': props.text,
    }"
    :style="{
      color: props.color ? `#${props.color}` : '',
    }"
  >
    <slot name="icon"></slot>
    <slot name="default"></slot>
  </span>
</template>

<style lang="scss" scoped>
.tag-item {
  margin: 0 2px;
  box-sizing: border-box;
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
}
.is-round {
  border-radius: 50%;
}
.is-strong {
  font-weight: bold;
}
.is-text {
  background-color: transparent;
}
</style>
