import { FilterFn } from "@tanstack/react-table";
import { JobApplication } from "@/DummyData/Data";

export const titleFilter: FilterFn<JobApplication> = (rows, columnId, filterValue) => {
  const jobPosition: string = rows.getValue(columnId) || "";
  const query = String(filterValue).toLowerCase();
  return jobPosition.toLowerCase().includes(query);
};
