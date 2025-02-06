import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useOpenDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
