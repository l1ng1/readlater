
<template>
    <div class="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white">
        <h3 class="text-base font-semibold leading-snug">
            <NuxtLink :to="`/article/${props.article.id}`" class="hover:text-blue-600 transition-colors">
                {{ props.article.title }}
            </NuxtLink>
        </h3>
        <div class="flex gap-4 text-sm text-gray-500">
            <span>{{ props.article.by }}</span>
            <span>{{ convertedDate }}</span>
        </div>
        <div class="flex gap-4 text-sm text-gray-600">
            <span>⬆ {{ props.article.score }}</span>
            <span>💬 {{ props.article.descendants }}</span>
        </div>
        <button 
            class="self-start mt-1 px-3 py-1 text-sm rounded-lg border transition-colors"
            :class="useArticles.isSaved(props.article.id) 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'"
            @click="useArticles.toggleSave(props.article)"
        >
            {{ useArticles.isSaved(props.article.id) ? '✓ Saved' : 'Save' }}
        </button>
    </div>
</template>


<script setup lang="ts">
import type { Article } from '~/types';

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