import { defineStore } from "pinia";
import type { SavedArticle,Article } from "~/types";

export const useSavedStore = defineStore("saved",{
    state:()=>({
        savedArticle:[] as SavedArticle[],
        savedIds: new Set<number>()
    }),
    getters:{
        isSaved:(state)=>{
            return (id:number) =>{
                 return state.savedIds.has(id)    
            }
        }
    },
    actions:{
        save(article:Article){
            if(!this.isSaved(article.id)){
                this.savedArticle.push({...article,savedAt:new Date().getTime()});
                this.savedIds.add(article.id);
            }
        },
        remove(id:number){
            this.savedArticle = this.savedArticle.filter((item)=>item.id !== id);
            this.savedIds.delete(id)
        }
    }
})

