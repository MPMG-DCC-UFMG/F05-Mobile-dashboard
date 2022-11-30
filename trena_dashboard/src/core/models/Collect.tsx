import { Photo } from "./Photo";

export interface Collect {
  id?: string;
  public_work_id: string;
  inspection_flag: string | null;
  queue_status: number;
  queue_status_date: number;
  date: number;
  user_email: string;
  comments?: string;
  public_work_status?: number;
  photos: Photo[];
}
