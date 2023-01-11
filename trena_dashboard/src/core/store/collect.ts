import { create } from "zustand";
import { Collect } from "../models/Collect";

type CollectStore = {
  collects: Collect[];
  selectedCollect: Collect;
  setCollects: (collects: Collect[]) => void;
  collectsDialog: boolean[];
  setCollectsDialog: (state: boolean[]) => void;
};

export const useCollectStore = create<CollectStore>((set) => ({
  collects: [],
  selectedCollect: {} as Collect,
  setCollects: (newCollects: Collect[]) => {
    set(() => ({
      collects: newCollects,
    }));
  },
  collectsDialog: [],
  setCollectsDialog: (newState: boolean[]) => {
    set(() => ({
      collectsDialog: newState,
    }));
  },
}));
