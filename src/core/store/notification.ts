import { create } from "zustand";
import { Notification } from "../models/Notification";

type NotificationStore = {
	notifications: Notification[];
	commentsDialog: boolean[];
	sendNotificationDialog: boolean[];
	inspectionNotificationsDialog: boolean[];
	pushNotificationsDialog: boolean[];
	setNotifications: (notifications: Notification[]) => void;
	setCommentsDialog: (state: boolean[]) => void;
	setSendNotificationDialog: (state: boolean[]) => void;
	setInspectionNotificationsDialog: (state: boolean[]) => void;
	setPushNotificationsDialog: (state: boolean[]) => void;
};

export const useNotificationsStore = create<NotificationStore>((set) => ({
	notifications: [],
	commentsDialog: [],
	sendNotificationDialog: [],
	inspectionNotificationsDialog: [],
	pushNotificationsDialog: [],
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
	setInspectionNotificationsDialog: (state: boolean[]) => {
		set(() => ({
			inspectionNotificationsDialog: state,
		}));
	},
	setPushNotificationsDialog: (state: boolean[]) => {
		set(() => ({
			pushNotificationsDialog: state,
		}));
	},
}));
