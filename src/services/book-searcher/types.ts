import * as repositories from "../../repositories";

export interface IBookSearchRequest extends Partial<repositories.IBook>{
    order?: string,
    skip?: number,
    limit?: number,
}

export type IBookSearchResult = repositories.IBook[];
