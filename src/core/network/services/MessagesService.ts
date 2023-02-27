import Config from "../../../config/Config";
import { SendMessageDTO } from "../../models/dto/SendMessageDTO";
import { Message } from "../../models/Message";
import TrenaAPI from "../TrenaAPI";

const baseUrl = Config.BASE_URL + "/message/";

const getMessagesFromCall = async (callId: string): Promise<Message[]> => {
	const url = baseUrl;
	const res = await TrenaAPI.network().query({ call_id: callId }).get(url);

	return res.body;
};

const sendMessage = async (message: SendMessageDTO): Promise<Message> => {
	const url = baseUrl;
	const res = await TrenaAPI.network().post(url).send(message);

	return res.body;
};

const deleteMessage = async (messageId: string): Promise<Message> => {
	const url = baseUrl;
	const res = await TrenaAPI.network()
		.delete(url)
		.query({ message_id: messageId });

	return res.body;
};

const markMessageAsReaded = async (messageId: string): Promise<Message> => {
	const url = baseUrl + "read";
	const res = await TrenaAPI.network()
		.post(url)
		.query({ message_id: messageId });

	return res.body;
};

export const MessageServiceQuery = {
	getMessagesFromCall,
	sendMessage,
	deleteMessage,
	markMessageAsReaded,
};
