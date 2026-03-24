<template>

    <div class="flex-col">
        <RecycleScroller
        :items="savedArticle"
        :item-size="200"
        key-field="id"
        v-slot="{item}"
        >
            <ArticleCard :article='item' />
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