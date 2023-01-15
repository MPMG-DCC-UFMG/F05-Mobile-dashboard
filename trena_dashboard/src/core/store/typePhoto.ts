import { create } from "zustand";
import { TypePhoto } from "../models/TypePhoto";

type TypePhotoStore = {
	typePhotos: TypePhoto[];
	editDialog: boolean[];
	setTypePhotos: (typePhotos: TypePhoto[]) => void;
	setEditDialog: (state: boolean[]) => void;
};

export const useTypePhotoStore = create<TypePhotoStore>((set) => ({
	typePhotos: [],
	editDialog: [],
	setTypePhotos: (newTypePhotos: TypePhoto[]) => {
		set(() => ({
			typePhotos: newTypePhotos,
		}));
	},
	setEditDialog: (newState: boolean[]) => {
		set(() => ({
			editDialog: newState,
		}));
	},
}));
