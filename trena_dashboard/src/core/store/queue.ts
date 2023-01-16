import { create } from "zustand";
import { PublicWork } from "../models/PublicWork";

type QueueStore = {
	publicWorkQueue: PublicWork[];
	publicWorkWithCollectsInQueue: PublicWork[];
	evaluateCollectsDialog: boolean[];
	evaluatePublicWorkDialog: boolean[];
	setPublicWorkQueue: (newQueue: PublicWork[]) => void;
	setPublicWorkWithCollectsInQueue: (newQueue: PublicWork[]) => void;
	setEvaluateCollectsDialog: (newState: boolean[]) => void;
	setEvaluatePublicWorkDialog: (newState: boolean[]) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
	publicWorkQueue: [],
	publicWorkWithCollectsInQueue: [],
	evaluateCollectsDialog: [],
	evaluatePublicWorkDialog: [],
	setPublicWorkQueue: (newQueue: PublicWork[]) => {
		set(() => ({
			publicWorkQueue: newQueue,
		}));
	},
	setPublicWorkWithCollectsInQueue: (newQueue: PublicWork[]) => {
		set(() => ({
			publicWorkWithCollectsInQueue: newQueue,
		}));
	},
	setEvaluateCollectsDialog: (newState: boolean[]) => {
		set(() => ({
			evaluateCollectsDialog: newState,
		}));
	},
	setEvaluatePublicWorkDialog: (newState: boolean[]) => {
		set(() => ({
			evaluatePublicWorkDialog: newState,
		}));
	},
}));
