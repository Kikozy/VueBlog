<script setup lang="ts">
import { reactive } from 'vue'
import { queryDocTags } from '@api/query'
import TagItem from '@comp/TagItem.vue'

interface Tag {
    name: string
    color: string
    tagLink: string
}

const state = reactive({
    tages: <Array<Tag>>[],

})

queryDocTags().then(
    (res: any) => {
        state.tages = res
    })

</script>
<template>
    <h1>Tags</h1>
    <tag-item v-for="tag of state.tages" :key="tag.name" :name="tag.name" :color="tag.color" :link="tag.tagLink">
    </tag-item>
</template>
