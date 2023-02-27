export interface CreateInspectionDTO {
	name: string;
	inquiry_number: number;
	description: string;
	public_work_id: string;
	user_email: string;
	secret: boolean;
}
