import { QueryFunctionContext } from "react-query";
import Config from "../../../config/Config";
import { Comment } from "../../models/Comment";
import { CreateCommentDTO } from "../../models/dto/comment/CreateCommentDTO";
import { CreateNotificationDTO } from "../../models/dto/notification/CreateNotificationDTO";
import { PushMessageDTO } from "../../models/dto/notification/PushMessageDTO";
import { Notification } from "../../models/Notification";
import TrenaAPI from "../TrenaAPI";

const BASE_URL = Config.BASE_URL + "/notification";

async function getAllNotifications(): Promise<Notification[]> {
	const call = BASE_URL;
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function sendNotification(
	notification: CreateNotificationDTO
): Promise<Notification> {
	const call = BASE_URL + "/add";
	const res = await TrenaAPI.network().post(call).send(notification);

	return res.body;
}

async function getNotificationById(
	ctx: QueryFunctionContext
): Promise<Notification[]> {
	const [, id] = ctx.queryKey;
	const call = BASE_URL + `/${id}`;
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function deleteNotification(id: string): Promise<Notification> {
	const call = BASE_URL + "/delete";
	const res = await TrenaAPI.network()
		.delete(call)
		.query({ notification_id: id });

	return res.body;
}

async function getAllComments(): Promise<Comment[]> {
	const call = BASE_URL + "/comments/all";
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function addComment(comment: CreateCommentDTO): Promise<Comment> {
	const call = BASE_URL + "/add/comments";
	const res = await TrenaAPI.network().post(call).send(comment);

	return res.body;
}

async function getCommentsFromNotification(
	ctx: QueryFunctionContext
): Promise<Comment[]> {
	const [, id] = ctx.queryKey;
	const call = BASE_URL + `/comments/${id}`;
	const res = await TrenaAPI.network().get(call);

	return res.body;
}

async function sendPushNotification(message: PushMessageDTO): Promise<void> {
	const call = BASE_URL + "/push";
	const res = await TrenaAPI.network().post(call).send(message);

	return res.body;
}

export const NotificationServiceQuery = {
	getAllNotifications,
	sendNotification,
	getNotificationById,
	deleteNotification,
	getAllComments,
	addComment,
	getCommentsFromNotification,
	sendPushNotification,
};
