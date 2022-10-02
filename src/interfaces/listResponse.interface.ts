export interface ResponseList <T> {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    orderBy: string;
    orderByDesc: boolean;
    nextUrl: string;
    priorUrl: string;
    firstUrl: string;
    lastUrl: string;
    result: T[];
}