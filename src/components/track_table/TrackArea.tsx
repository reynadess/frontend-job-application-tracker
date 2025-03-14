import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import SearchInput from "./SearchInput";
import PriorityDropDown from "./PriorityDropDown";
import StatusDropDown from "./StatusDropDown";
import ViewColumnDropDown from "./ViewColumnDropDowm";
import { TaskTable } from "./TaskTable";
import PaginationArea from "./pagination/PaginationArea";
import { JobApplication } from "@/DummyData/Data";
import TableSkeleton from "./TableSkeleton";

import {
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import  {TasksColumns}  from "./TasksColumns";
import { titleFilter } from "./filters/TitleFilter";
import { priorityFilter } from "./filters/priorityFilter";
import { statusFilter } from "./filters/statusFilter";
import { useEffect, useState } from "react";
import { useCheckedPrioritiesStore } from "@/hooks/zustand/useCheckedPrioritiesStore";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { useQueryStore } from "@/hooks/zustand/useQueryStore";
import { useCheckedStatusStore } from "@/hooks/zustand/useCheckedStatusStore";

declare module "@tanstack/react-table" {
  interface FilterFns {
    titleFilter: FilterFn<JobApplication>;
    priorityFilter: FilterFn<JobApplication>;
    statusFilter: FilterFn<JobApplication>;
  }
}

const TrackArea = () => {
  const { setCheckedPriorities } = useCheckedPrioritiesStore();
  const { checkedStatus, setCheckedStatus } = useCheckedStatusStore();
  const { jobs, fetchJobs } = useJobsDataStore();
  const query = useQueryStore();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { checkedPriorities } = useCheckedPrioritiesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      await fetchJobs();
      setLoading(false);
    };
    loadJobs();
  }, [fetchJobs]);

  // useEffect(() => {
  //   console.log("Jobs data:", jobs); // Add this line to verify the data
  // }, [jobs]);

  const table = useReactTable({
    data: jobs || [],
    columns: TasksColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    filterFns: { titleFilter, priorityFilter, statusFilter },
  });

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];
    if (query) {
      newFilters.push({ id: "jobPosition", value: query });
    }
    if (checkedStatus.length > 0) {
      newFilters.push({ id: "status", value: checkedStatus });
    }
    if (checkedPriorities.length > 0) {
      newFilters.push({ id: "priority", value: checkedPriorities });
    }
    setColumnFilters(newFilters);
  }, [query, checkedStatus, checkedPriorities]);
  

  return (
    <div className="px-7 mt-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SearchInput />
              <StatusDropDown />
              <PriorityDropDown />
              <Button
                onClick={() => {
                  setCheckedPriorities([]);
                  setCheckedStatus([]);
                }}
                className="h-10"
                variant={"ghost"}
              >
                <span>Reset</span>
                <X />
              </Button>
            </div>
            {/* dropdown */}
            <ViewColumnDropDown table={table} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton />
          ) : (
            <TaskTable table={table} columns={TasksColumns}/>
          )}
        </CardContent>
        <CardFooter>
          <PaginationArea />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TrackArea;