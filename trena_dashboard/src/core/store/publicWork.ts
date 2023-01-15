import { create } from "zustand";
import { PublicWork } from "../models/PublicWork";

type PublicWorkStore = {
	publicWorks: PublicWork[];
	actionDialog: boolean[];
	localizationDialog: boolean[];
	inspectionsDialog: boolean[];
	addInspection: boolean[];
	setPublicWorks: (publicWork: PublicWork[]) => void;
	setActionDialog: (state: boolean[]) => void;
	setLocalizationDialog: (state: boolean[]) => void;
	setInspectionsDialog: (state: boolean[]) => void;
	setAddInspection: (state: boolean[]) => void;
};

export const usePublicWorkStore = create<PublicWorkStore>((set) => ({
	publicWorks: [],
	actionDialog: [],
	localizationDialog: [],
	inspectionsDialog: [],
	addInspection: [],
	setPublicWorks: (newPublicWorks: PublicWork[]) => {
		set(() => ({
			publicWorks: newPublicWorks,
		}));
	},
	setActionDialog: (newState: boolean[]) => {
		set(() => ({
			actionDialog: newState,
		}));
	},
	setLocalizationDialog: (newState: boolean[]) => {
		set(() => ({
			localizationDialog: newState,
		}));
	},
	setInspectionsDialog: (newState: boolean[]) => {
		set(() => ({
			inspectionsDialog: newState,
		}));
	},
	setAddInspection: (newState: boolean[]) => {
		set(() => ({
			addInspection: newState,
		}));
	},
}));
