<template>
<div class="flex flex-col">
    <div v-for="comment in props.comments" :key="comment.id">
        <CommentItem :comment="comment"/>
        <div v-if="comment.children.length > 0" class="ml-4 border-l-2 border-gray-100 pl-3">
            <CommentTree :comments="comment.children" />
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import CommentItem from './CommentItem.vue';
import type { Comment } from '~/types';
interface Props{
    comments:Comment[]
}

const props = defineProps<Props>()

</script>
