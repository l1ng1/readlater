<template>

<div>
    <p class="text-lg">{{ props.comment.by }}</p>
    <p>{{ props.comment.text }}</p>
</div>

</template>


<script setup lang="ts">
import type { Comment } from '~/types';

interface Props{
    comment:Comment
}

const props = defineProps<Props>()


</script>