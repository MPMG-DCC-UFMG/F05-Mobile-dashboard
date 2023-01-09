export interface CreateInspectionDTO {
  inquiry_number: number | null;
  name: string;
  user_email: string;
  public_work_id: string;
  description: string;
  status: number;
  request_date: number;
}
