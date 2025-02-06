import {create} from "zustand"
import { Priority } from "@/DummyData/Data"


interface useCheckedPrioritiesStoreInterface {
    checkedPriorities: Priority[];
    setCheckedPriorities: (priorities: Priority[]) => void;
}

export const useCheckedPrioritiesStore = create<useCheckedPrioritiesStoreInterface>((set) => ({
    checkedPriorities: [],
    setCheckedPriorities: (prioritiesProps) => set({checkedPriorities: prioritiesProps})
}))