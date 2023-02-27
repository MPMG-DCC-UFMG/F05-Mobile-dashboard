export interface Message {
	id: string;
	sender_email: string;
	receiver_email: string;
	text: string;
	timestamp: number;
	call_id: string;
	readed: boolean;
}
