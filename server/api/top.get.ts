import type {Article , PaginatedResponse ,HNItem} from '../../app/types'


export default defineEventHandler(async(ev):Promise<PaginatedResponse<Article>>=>{
    const query = getQuery(ev);
    const page = Number(query?.page) || 1;
    try{
        const ids:number[] = await $fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const neededIDs = ids.slice((page-1)*20, (page)*20);

        const data = await Promise.all(neededIDs.map((id:number) => { return $fetch<Article>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)}))
        return{
            page:page,
            data:data,
            totalPages:Math.ceil(ids.length/20),
        }
    }
    catch(e){
        throw createError('Не удалось получить статьи с нужной страницы');
    }
})