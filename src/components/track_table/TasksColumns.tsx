import { JobApplication, Priority, Status } from "@/DummyData/Data";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  BookMarkedIcon,
  Building2,
  Check,
  EyeOffIcon,
  LoaderPinwheel,
  Star,
  User2,
} from "lucide-react";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TasksDropDown from "./tasks_drop_down/TasksDropDown";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";

function renderStatusIcons(status: Status) {
  switch (status) {
    case "Bookmark":
      return BookMarkedIcon;
    case "Applied":
      return Building2;
    case "Applying":
      return LoaderPinwheel;
    case "Accepted":
      return Check;
    case "Interview":
      return User2;

    default:
      break;
  }
}
function renderPriorityIcons(priority: Priority) {
  switch (priority) {
    case "High":
      return ArrowUp;
    case "Medium":
      return ArrowRight;
    case "Low":
      return ArrowDown;
    default:
      break;
  }
}
function formatDate(date: Date): string {
  // extract date parts
  const day = date.getDate();
  const month = date.toLocaleDateString("default", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
}
type SortableHeaderProps = {
  column: Column<JobApplication, unknown>;
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === "asc"
      ? ArrowDown
      : isSorted === "desc"
      ? ArrowUp
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <div
          className={`flex items-center py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Sort by ${label}`}
        >
          {label}
          <SortingIcon className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowUp className="mr-2 h4 w-4" />
          ASC
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowDown className="mr-2 h4 w-4" />
          Desc
        </DropdownMenuItem>
        {label !== "Job Position" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility()}>
              <EyeOffIcon className="mr-2 size-7 text-opacity-90" />
              Hide
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TasksColumns: ColumnDef<JobApplication>[] = [

  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} label="Job Position" />
    ),
    cell: ({ row }) => {
      const jobPositionLabel = row.original.labels;
      const jobPositionTitle = row.original.jobPosition;
      return (
        <div className="flex items-center gap-2">
          <Badge variant={"outline"}>{jobPositionLabel}</Badge>
          <span>{jobPositionTitle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isFavourite",
    header: "",
    cell: ({ row }) => {
      const FavouriteIcon = row.original.isFavourite && Star;
      return FavouriteIcon && <FavouriteIcon size={14} />;
    },
  },

  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <SortableHeader column={column} label="Company Name" />
    ),
    cell: ({ row }) => {
      const companyName = row.original.companyName;
      return (
        <div className="flex center gap-2">
          <span >{companyName}</span>
        </div>
      );
    },
  },
 
 
  {
    accessorKey: "salary",
    header: ({ column }) => <SortableHeader column={column} label="Salary" />,
    cell: ({ row }) => {
      const salary = row.original.salary;
      return (
        <div className="flex items-center gap-2 text-sm">
          <span >{salary}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortableHeader column={column} label="Location" />,
    cell: ({ row }) => {
      const location = row.original.location;
      return (
        <div className="flex items-center gap-2 text-sm">
          <span>{location}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "appliedDate",
    header: ({ column }) => (
      <SortableHeader column={column} label="Applied date" />
    ),
    cell: ({ row }) => {
      const date = row.original.appliedDate;
      const formattedDate = formatDate(new Date(date));
      return formattedDate;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortableHeader column={column} label="Priority" />,
    cell: ({ row }) => {
      const PriorityIcon = renderPriorityIcons(row.original.priority);
      const priority = row.original.priority;
      return (
        <div className="flex items-center gap-2 text-sm">
          {PriorityIcon && (
            <PriorityIcon size={17} className="text-gray-600 opacity-95" />
          )}
          <span>{priority}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const StatusIcon = renderStatusIcons(row.original.status);
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2 ">
          {StatusIcon && (
            <StatusIcon size={17} className="text-gray-600 opacity-95" />
          )}
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ShowTaskDropDown job={row.original} />;
    },
  },
];

function ShowTaskDropDown({ job }: { job: JobApplication }) {
  const { setSelectedJob } = useJobsDataStore();

  return (
    <TasksDropDown
      onOpen={() => setSelectedJob(job)}
      onClose={() => setSelectedJob(null)}
    />
  );
}
