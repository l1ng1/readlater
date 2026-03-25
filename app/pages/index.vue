<template>
<div class="max-w-2xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Hacker News</h1>
        <NuxtLink to="/saved" class="text-sm text-blue-600 hover:underline">Saved articles</NuxtLink>
    </div>
    
    <input 
        type="text" 
        v-model="searchInput" 
        placeholder="Search articles..."
        class="w-full px-4 py-2 mb-6 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
    >

    <div v-if="error" class="p-4 bg-red-50 text-red-500 rounded-lg">
        Error loading articles
    </div>
    <div v-else class="flex flex-col gap-3">
        <template v-if="pending">
            <SkeletonCard v-for="i in 20" :key="i" />
        </template>
        <template v-else>
            <ArticleCard v-for="card in neededArticles" :article="card" :key="card.id" />
        </template>
    </div>

    <div class="flex justify-between mt-8">
        <button 
            class="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            @click="previous" 
            :disabled="page === 1"
        >← Previous</button>
        <span class="text-sm text-gray-500 self-center">Page {{ page }} / {{ data?.totalPages }}</span>
        <button 
            class="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            @click="next" 
            :disabled="page === data?.totalPages"
        >Next →</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { useHackerNews } from '~/composables/useHackerNews';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';

const searchInput = ref('');
const debouncedSearch = ref('');
const page = ref(1);
const hackerNews = useHackerNews()

const {data,pending,error,refresh} = await useAsyncData(`top-stories-${page.value}`,()=>hackerNews.fetchTopStories(page.value),{
    watch:[page],
    lazy:true,
})

const updateSearch = useDebounceFn((value:string)=>{
    debouncedSearch.value = value
},300);
watch(searchInput,(value)=> updateSearch(value))

const next = ()=>{page.value++;}
const previous = ()=>{page.value--;}

const neededArticles = computed(()=>{
    return data.value?.data.filter((item)=>item.title.includes(debouncedSearch.value));
})

useSeoMeta({
    title:"Страница с стаьми",
    ogTitle:"Страница с статьми,но для tg",
    description:"На это странице показаны статьи с HackerNews",
    ogDescription:"На это странице показаны статьи с HackerNews,но в tg",
    ogImage:"https://ru-science.com/sites/default/files/upload/112/%D0%9A%D0%B0%D0%BA%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%20%D0%BE%D0%B1%D0%B7%D0%BE%D1%80%D0%BD%D1%83.png"
})

</script>


<style scoped>

</style>