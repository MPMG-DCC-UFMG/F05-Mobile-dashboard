import {PublicWork} from "./PublicWork";

export interface QueueItem {
    public_work: PublicWork,
    public_work_count: number,
    collect_count: number,
    photo_count: number
}