import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Columns3 } from "lucide-react";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { Table } from "@tanstack/react-table";
import { JobApplication } from "@/DummyData/Data";

const ViewColumnDropDowm = ({ table }: { table: Table<JobApplication> }) => {
  const { jobs } = useJobsDataStore();
  const columnToHide = ["priority", "status", "appliedDate" , "salary"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={!jobs} variant="outline" className="h-11 px-8">
          <Columns3 />
          <span>View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {table
          .getAllColumns()
          .filter(
            (column) => column.getCanHide() && columnToHide.includes(column.id)
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
              className="capitalize"
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewColumnDropDowm;
