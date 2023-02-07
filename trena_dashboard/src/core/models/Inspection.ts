export interface Inspection {
	flag: number;
	name: string;
	inquiry_number: number;
	description: string;
	public_work_id: string;
	status: number;
	user_email: string;
	request_date: number;
	limit_date: number;
	secret: boolean;
}
