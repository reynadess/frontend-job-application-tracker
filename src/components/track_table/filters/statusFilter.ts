import { FilterFn } from "@tanstack/react-table";
import { JobApplication } from "@/DummyData/Data";

export const statusFilter:FilterFn<JobApplication> = (
    row,
    columnId,
    filterValue:string
) => {
    const status :string = row.getValue(columnId);
    return filterValue.includes(status);
}