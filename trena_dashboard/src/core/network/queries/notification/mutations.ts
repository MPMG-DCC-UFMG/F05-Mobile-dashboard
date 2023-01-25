import { useMutation, useQueryClient } from "react-query";
import { Notify } from "../../../../components/Toast/Notify";
import { useNotificationsStore } from "../../../store/notification";
import { NotificationServiceQuery } from "../../services/NotificationService";

export function useSendNotification() {
	const queryClient = useQueryClient();
	const { notifications, setNotifications } = useNotificationsStore();

	return useMutation(NotificationServiceQuery.sendNotification, {
		onSuccess: (data) => {
			Notify("Notificação enviada!", "bottom-left", "info");
			setNotifications([...notifications, data]);
			queryClient.invalidateQueries("getAllNotifications");
			queryClient.invalidateQueries(["getNotificationById", data.id]);
		},
		onError: () => {
			Notify("Erro ao enviar notificação!", "bottom-left", "error");
		},
	});
}

export function useSendPushNotification() {
	const queryClient = useQueryClient();
	return useMutation(NotificationServiceQuery.sendPushNotification, {
		onSuccess: () => {
			Notify("Aparelho móvel notificado!", "bottom-left", "info");
			queryClient.invalidateQueries("getNotificationById");
		},
		onError: () => {
			Notify("Erro ao notificar aparelho móvel!", "bottom-left", "info");
		},
	});
}

export function useDeleteNotification() {
	const queryClient = useQueryClient();
	const { notifications, setNotifications } = useNotificationsStore();

	return useMutation(NotificationServiceQuery.deleteNotification, {
		onSuccess: (data) => {
			Notify("Notificação deletada!", "bottom-left", "info");
			setNotifications(notifications.filter((item) => item.id !== data.id));
			queryClient.invalidateQueries("getAllNotifications");
		},
		onError: () => {
			Notify("Erro ao deletar notificação!", "bottom-left", "error");
		},
	});
}

export function useSendComment() {
	const queryClient = useQueryClient();

	return useMutation(NotificationServiceQuery.addComment, {
		onSuccess: (data) => {
			Notify("Mensagem enviada!", "bottom-left", "info");
			queryClient.invalidateQueries(["getAllComments"]);
			queryClient.invalidateQueries(["getCommentsFromNotification", data.id]);
		},
		onError: () => {
			Notify("Erro ao enviar mensagem!", "bottom-left", "error");
		},
	});
}
