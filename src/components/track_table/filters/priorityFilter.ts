import { FilterFn } from "@tanstack/react-table";
import { JobApplication } from "@/DummyData/Data";

export const priorityFilter:FilterFn<JobApplication> = (
    row,
    columnId,
    filterValue:string
) => {
    const priority :string = row.getValue(columnId);
    return filterValue.includes(priority);
}