import { create } from "zustand";

type TableStore = {
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
};

export const useTableStore = create<TableStore>((set) => ({
  rowsPerPage: 10,
  setRowsPerPage: (rows: number) => {
    set(() => ({
      rowsPerPage: rows,
    }));
  },
}));
