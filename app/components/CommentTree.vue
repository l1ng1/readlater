<template>


<div class="flex-col">
    <div v-for="comment in props.comments">
        <CommentItem :comment="comment"/>
        <CommentTree v-if="comment.children.length > 0" :comments="comment.children" />
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
