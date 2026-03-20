
<template>
    <div class="flex-col w-64" >
        <h3 class="text-lg"><a :href="props.article.url">{{ props.article.title }}</a></h3>
        <p class="text-gray-500 text-sm">By: {{ props.article.by }}</p>
        <p class="text-base">Comments: {{ props.article.descendants }}</p>
        <p class="text-base font-bold">Score:{{ props.article.score }}</p>
        <p class="text-base">Time:{{ convertedDate }}</p>
        <p class="text-gray-500 text-sm">{{ useArticles.isSaved(props.article.id) ? 'saved':'not saved'}}</p>
        <button class="text-black text-base text-center bg-white px-6 py-3 mt-4 border border-black rounded"  @click="useArticles.toggleSave(props.article)">Save</button>
    </div>
</template>


<script setup lang="ts">
import type { Article } from '~/types';
import { useSavedArticles } from '~/composables/useSavedArticles';

const useArticles = useSavedArticles();


interface Props{
    article : Article
}
const props = defineProps<Props>()


const convertedDate = computed(()=>{
    const date = new Date(props.article.time*1000);
    return `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()}`
})


</script>


<style scoped>

</style>