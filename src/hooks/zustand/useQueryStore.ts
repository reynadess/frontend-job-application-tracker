import { create } from "zustand";

interface useQueryStoreInterface {
  query: string;
  setQuery: (query: string) => void;
}

export const useQueryStore = create<useQueryStoreInterface>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query: query }),
}));
