import type { HNItem ,PaginatedResponse } from "~/types";




export function useHackerNews(){


    const fetchTopStories = async(page:number):Promise<PaginatedResponse<HNItem>>=>{
        try{
        const req = await fetch(`/api/top?page=${page}`);
        return await req.json();
        }
        catch(e){
            throw createError("Не дулось получить топовые истории")
        }
    }

    const fetchItem = async(id:number):Promise<HNItem>=>{
        try{        
            const req = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const res =await req.json();
            return res;
        }
        catch(e){
            throw createError("Не удалось найти статью по такому id")
        }
    }

    const fetchComments = async (item:HNItem,depth:number = 0):Promise<HNItem[]>=>{
        let coments:HNItem[];
        if(depth >= 3 || item.kids?.length === 0){
            return [];
        }
        else{
            depth++;
            coments = await Promise.all((item.kids ?? []).map(kid => fetchItem(kid)));
            for(const x of coments){
                coments = [...coments,...await fetchComments(x,depth)];
            }
            return coments;
        }
    }


    return {fetchTopStories,fetchItem,fetchComments};

}









