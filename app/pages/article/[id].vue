<template>

<div v-if="error">Error</div>
<div v-if="!pending" class="flex-col">
    <h3 class="text-lg"><a :href="data?.url">{{ data?.title }}</a></h3>
    <p class="text-gray-500 text-sm">By: {{ data?.by }}</p>
    <p class="text-base">Comments: {{ data?.descendants }}</p>
    <p class="text-base font-bold">Score:{{ data?.score }}</p>
    <p class="text-base">Time:{{ convertedDate }}</p>
    <button class="text-black text-base text-center bg-white px-6 py-3 mt-4 border border-black rounded"  @click="useArticles.toggleSave(data as Article)">Save</button>
</div>
<SkeletonCard v-else />


    
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


</script>


<style scoped></style>