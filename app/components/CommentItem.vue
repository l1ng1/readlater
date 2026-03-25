<template>
<div class="py-3 border-b border-gray-100">
    <p class="text-sm font-semibold text-gray-700 mb-1">{{ props.comment.by }}</p>
    <p class="text-sm text-gray-600 leading-relaxed" v-html="props.comment.text"></p>
</div>
</template>


<script setup lang="ts">
import type { Comment } from '~/types';

interface Props{
    comment:Comment
}

const props = defineProps<Props>()


</script>