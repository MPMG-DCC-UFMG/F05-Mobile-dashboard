export interface CreateCommentDTO {
	id: string;
	notification_id: string;
	content: string;
	receive_email: string;
	send_email: string;
	timestamp: number;
}
