<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>


<script setup lang="ts">


onMounted(()=>{
  useSavedArticles().loadFromStorage()
})

const store = useSavedStore()

store.$subscribe((mutation,state)=>{
  localStorage.setItem('articles',JSON.stringify(state.savedArticle))
})



</script>
