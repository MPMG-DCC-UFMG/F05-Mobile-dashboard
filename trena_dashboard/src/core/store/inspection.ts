import { create } from "zustand";
import { Inspection } from "../models/Inspection";

type InspectionStore = {
  inspections: Inspection[];
  collectModal: boolean[];
  setInspections: (inspections: Inspection[]) => void;
  setCollectModal: (state: boolean[]) => void;
};

export const useInspectionStore = create<InspectionStore>((set) => ({
  inspections: [],
  collectModal: [],
  setInspections: (newInspections: Inspection[]) => {
    set(() => ({
      inspections: newInspections,
    }));
  },
  setCollectModal: (newState: boolean[]) => {
    set(() => ({
      collectModal: newState,
    }));
  },
}));
