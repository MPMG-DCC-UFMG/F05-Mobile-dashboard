import { useQuery } from "react-query";
import { useNotificationsStore } from "../../../store/notification";
import { NotificationServiceQuery } from "../../services/NotificationService";

export function useGetAllNotifications() {
	const { setNotifications, setCommentsDialog } = useNotificationsStore();

	return useQuery(
		["getAllNotifications"],
		NotificationServiceQuery.getAllNotifications,
		{
			onSuccess: (data) => {
				setNotifications(data);
				setCommentsDialog(Array(data.length).fill(false));
			},
		}
	);
}

export function useGetNotificationById(id: string) {
	return useQuery(
		["getNotificationById", id],
		NotificationServiceQuery.getNotificationById
	);
}

export function useGetAllComments() {
	return useQuery(["getAllComments"], NotificationServiceQuery.getAllComments);
}

export function useGetCommentsFromNotification(id: string) {
	return useQuery(
		["getCommentsFromNotification", id],
		NotificationServiceQuery.getCommentsFromNotification
	);
}
