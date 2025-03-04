import {create} from 'zustand';
import { Status } from '@/DummyData/Data';

interface useCheckedStatusStoreInterface {
    checkedStatus: Status[];
    setCheckedStatus: (status: Status[]) => void;
}

export const useCheckedStatusStore = create<useCheckedStatusStoreInterface>((set) => ({
    checkedStatus: [],
    setCheckedStatus: (statusProps) => set({checkedStatus: statusProps})
}));