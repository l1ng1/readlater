
export type HNItemType = "story"|"job"|"comment"|"poll"|"pollopt"


export interface HNItem{
    by:string,
    descendants?:number,
    id:number,
    kids?:number[],
    parent?:number,
    text?:string,
    score?:number,
    time:number,
    title?:string,
    type:HNItemType,
    url?:string
}

export type Article = Required<Pick<HNItem,"id"|"title"|"url"|"by"|"score"|"time"|"descendants">>

export interface SavedArticle extends Article{
    savedAt:number
}


export interface PaginatedResponse<T>{
    page:number,
    data:T[],
    totalPages:number,
}