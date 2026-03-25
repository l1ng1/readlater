<template>
<div class="max-w-2xl mx-auto px-4 py-8">
    <div v-if="error" class="p-4 bg-red-50 text-red-500 rounded-lg">Error loading article</div>
    
    <template v-if="!pending && data">
        <div class="mb-8">
            <h1 class="text-2xl font-bold mb-3">
                <a :href="data.url" target="_blank" class="hover:text-blue-600 transition-colors">
                    {{ data.title }}
                </a>
            </h1>
            <div class="flex gap-4 text-sm text-gray-500 mb-3">
                <span>{{ data.by }}</span>
                <span>{{ convertedDate }}</span>
                <span>⬆ {{ data.score }}</span>
                <span>💬 {{ data.descendants }}</span>
            </div>
            <button 
                class="px-4 py-2 text-sm rounded-lg border transition-colors"
                :class="useArticles.isSaved(data.id) 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'"
                @click="useArticles.toggleSave(data as Article)"
            >
                {{ useArticles.isSaved(data.id) ? '✓ Saved' : 'Save' }}
            </button>
        </div>

        <h2 class="text-lg font-semibold mb-4">Comments</h2>
        <div v-if="comments.length === 0" class="text-gray-400 text-sm">Loading comments...</div>
        <CommentTree :comments="comments" />
    </template>
    <SkeletonCard v-else />
</div>
</template>

<script setup lang="ts">
import type { Article, Comment } from '~/types';
const hackerNews = useHackerNews()
const route = useRoute();
const useArticles = useSavedArticles()

const {data,pending,error,refresh} = await useAsyncData(`article-${route.params.id}`,()=>hackerNews.fetchItem(Number(route.params.id)))
const comments = ref<Comment[]>([])

onMounted(async ()=>{
    if(data.value){
        comments.value = await hackerNews.fetchComments(data.value)
    }
})

const convertedDate = computed(()=>{
    if(data.value){
        const date = new Date(data.value.time*1000);
        return `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()}`
    }
    
})

useSeoMeta({
    title:()=>data.value?.title ?? 'Статья',
    ogTitle:()=>data.value?.title ?? 'Статья',
    description:"На это странице показаны статьи с HackerNews",
    ogDescription:"На это странице показаны статьи с HackerNews,но в tg",
    ogImage:"https://ru-science.com/sites/default/files/upload/112/%D0%9A%D0%B0%D0%BA%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%20%D0%BE%D0%B1%D0%B7%D0%BE%D1%80%D0%BD%D1%83.png"
})


</script>


<style scoped></style>