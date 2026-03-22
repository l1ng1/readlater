<template>
<input type="text" v-model="searchInput" placeholder="An article name...">
<div class="flex-col gap">
    <div v-if="error" class="p-8">
        <p class="text-red-200">Error:{{ error }}</p>
    </div>
    <div class="flex-col gap-4" v-else>
        <template v-if="pending">
            <SkeletonCard  v-for="(item,index) in 20" :key="index" />
        </template>
        <template v-else>
            <ArticleCard  v-for="card in neededArticles" :article="card" />
        </template>
    </div>
    <div class="flex-row justify-between">
        <button class="rounded border bg-black border-black" @click="previous" :disabled="page === 1">Pervious</button>
        <button class="rounded border bg-black border-black" @click="next" :disabled="page === data?.totalPages">Next</button>
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
    watch:[page]
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



</script>


<style scoped>

</style>