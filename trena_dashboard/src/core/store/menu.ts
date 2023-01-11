import { create } from "zustand";

type MenuStore = {
  workConfig: boolean;
  toggleWorkConfig: () => void;
  inspections: boolean;
  toggleInspections: () => void;
  publicWorks: boolean;
  togglePublicWorks: () => void;
  notifications: boolean;
  toggleNotifications: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  workConfig: false,
  toggleWorkConfig: () => {
    set((state) => ({
      workConfig: !state.workConfig,
    }));
  },
  inspections: false,
  toggleInspections: () => {
    set((state) => ({
      inspections: !state.inspections,
    }));
  },
  publicWorks: false,
  togglePublicWorks: () => {
    set((state) => ({
      publicWorks: !state.publicWorks,
    }));
  },
  notifications: false,
  toggleNotifications: () => {
    set((state) => ({
      notifications: !state.notifications,
    }));
  },
}));
