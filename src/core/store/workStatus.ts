import { create } from "zustand";
import { WorkStatus } from "../models/WorkStatus";

type WorkStatusStore = {
	workStatus: WorkStatus[];
	editDialog: boolean[];
	setWorkStatus: (workStatus: WorkStatus[]) => void;
	setEditDialog: (state: boolean[]) => void;
};

export const useWorkStatusStore = create<WorkStatusStore>((set) => ({
	workStatus: [],
	editDialog: [],
	setWorkStatus: (newWorkStatus: WorkStatus[]) => {
		set(() => ({
			workStatus: newWorkStatus,
		}));
	},
	setEditDialog: (newState: boolean[]) => {
		set(() => ({
			editDialog: newState,
		}));
	},
}));
