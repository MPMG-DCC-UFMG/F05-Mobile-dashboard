import { create } from "zustand";
import { Notification } from "../models/Notification";

type NotificationStore = {
	notifications: Notification[];
	commentsDialog: boolean[];
	sendNotificationDialog: boolean[];
	setNotifications: (notifications: Notification[]) => void;
	setCommentsDialog: (state: boolean[]) => void;
	setSendNotificationDialog: (state: boolean[]) => void;
};

export const useNotificationsStore = create<NotificationStore>((set) => ({
	notifications: [],
	commentsDialog: [],
	sendNotificationDialog: [],
	setNotifications: (newNotifications: Notification[]) => {
		set(() => ({
			notifications: newNotifications,
		}));
	},
	setCommentsDialog: (state: boolean[]) => {
		set(() => ({
			commentsDialog: state,
		}));
	},
	setSendNotificationDialog: (state: boolean[]) => {
		set(() => ({
			sendNotificationDialog: state,
		}));
	},
}));
