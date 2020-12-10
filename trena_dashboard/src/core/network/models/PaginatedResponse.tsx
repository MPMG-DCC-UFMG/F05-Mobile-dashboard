export interface PaginatedResponse<T>{
    data: T[]
    page: number
    per_page: number
    total: number
}