import { create } from "zustand";
import { TypeWork } from "../models/TypeWork";

type TypeWorkStore = {
	typeWorks: TypeWork[];
	editDialog: boolean[];
	deleteDialog: boolean[];
	setTypeWorks: (typeworks: TypeWork[]) => void;
	setEditDialog: (state: boolean[]) => void;
	setDeleteDialog: (state: boolean[]) => void;
};

export const useTypeWorkStore = create<TypeWorkStore>((set) => ({
	typeWorks: [],
	editDialog: [],
	deleteDialog: [],
	setTypeWorks: (newTypeWorks: TypeWork[]) => {
		set(() => ({
			typeWorks: newTypeWorks,
		}));
	},
	setEditDialog: (newState: boolean[]) => {
		set(() => ({
			editDialog: newState,
		}));
	},
	setDeleteDialog: (newState: boolean[]) => {
		set(() => ({
			deleteDialog: newState,
		}));
	},
}));
