<template>
    <div class="max-w-2xl mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">Saved Articles</h1>
        <RecycleScroller
            :items="savedArticle"
            :item-size="170"
            key-field="id"
            v-slot="{ item }"
        >
            <div class="mb-3">
                <ArticleCard :article="item" />
            </div>
        </RecycleScroller>
    </div>
</template>



<script setup lang="ts">
definePageMeta({
    ssr:false
})
onMounted(()=>{
    useSavedArticles().loadFromStorage()
})
const articlesStore = useSavedStore()
const {savedArticle} = storeToRefs(articlesStore);




</script>