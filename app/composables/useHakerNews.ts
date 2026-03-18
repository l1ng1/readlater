import type { HNItem ,PaginatedResponse,Comment } from "~/types";




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

    const fetchComments = async (item:HNItem,depth:number = 0):Promise<Comment[]>=>{
        let items:HNItem[];
        if(depth >= 3 || item.kids?.length === 0){
            return [];
        }
        else{
            depth++;
            items = await Promise.all((item.kids ?? []).map(kid => fetchItem(kid)));
            const comments = await Promise.all(items.map(async (post) => ({
                ...post,
                children: await fetchComments(post, depth)
            })))
            return comments;
        }
    }


    return {fetchTopStories,fetchItem,fetchComments};

}









