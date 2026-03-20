import { useSavedStore } from "~/stores/saved";
import type { Article,SavedArticle } from "~/types";
export function useSavedArticles(){
    const store = useSavedStore();

    watch(store.savedArticle,()=>{
        saveToStorgae(store.savedArticle)
    })

    function loadFromStorage(){
        const data = localStorage.getItem("articles")
        if(!data) return
        const articles = JSON.parse(data) as SavedArticle[]
        articles.forEach(item => store.save(item));
    }

    function saveToStorgae(savedArticle:SavedArticle[]){
        localStorage.setItem('articles',JSON.stringify(savedArticle));
    }
    
    function toggleSave(article:Article){
        store.isSaved(article.id) ? store.remove(article.id) : store.save(article);
    }
    function isSaved(id:number){
        return store.isSaved(id);
    }


    return {loadFromStorage,saveToStorgae,toggleSave,isSaved}
}