import {Photo} from "./Photo";

export interface Collect {
    id?: string
    public_work_id: string
    date: number
    user_email: string
    comments?: string
    public_work_status?: number
    photos: Photo[]
}