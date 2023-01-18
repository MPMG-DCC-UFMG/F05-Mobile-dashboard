import { create } from "zustand";
import { Notification } from "../models/Notification";

type NotificationStore = {
	notifications: Notification[];
	commentsDialog: boolean[];
	setCommentsDialog: (state: boolean[]) => void;
	setNotifications: (notifications: Notification[]) => void;
};

export const useNotificationsStore = create<NotificationStore>((set) => ({
	notifications: [],
	commentsDialog: [],
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
}));
