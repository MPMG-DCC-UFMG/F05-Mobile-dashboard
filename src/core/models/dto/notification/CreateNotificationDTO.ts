export interface CreateNotificationDTO {
	id: string;
	timestamp: number;
	title: string;
	inspection_id: number;
	content: string;
	user_email: string;
	answer: boolean;
}
