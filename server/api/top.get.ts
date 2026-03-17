import type {Article , PaginatedResponse} from '../../app/types'


export default defineEventHandler(async(ev):Promise<PaginatedResponse<Article>>=>{
    const query = getQuery(ev);
    const page = Number(query?.page) || 1;
    try{
        const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const res = await ids.json();
        const neededIDs = res.slice((page-1)*20, (page)*20);

        const data = await Promise.all(neededIDs.map((id:number) => { return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())}))
        return{
            page:page,
            data:data,
            totalPages:Math.ceil(res.length/20),
        }
    }
    catch(e){
        throw createError('Не удалось получить статьи с нужной страницы');
    }
})