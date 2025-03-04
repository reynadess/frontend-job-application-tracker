import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { LucideIcon } from "lucide-react";
import { handleMenuItemClick } from "./utils";
import {  useToast } from "@/hooks/use-toast";
import { kind } from "./types";


const MenuItems = ({
  Icon,
  label,
  kind,
  shortcut,
  className,
}: {
  Icon: LucideIcon;
  label: string;
  kind :kind;
  shortcut: string;
  className?: string;
}) => {
  const {jobs , selectedJob , updateJobs} = useJobsDataStore();
  const {toast} = useToast();
  return (
    <DropdownMenuItem
    onClick={() => handleMenuItemClick(kind , jobs , selectedJob , updateJobs , toast)}
    >
      <Icon className={`mr-2 h-4 w-4 ${className}`} />
      <span className={`${className}`}>{label}</span>
      {shortcut && (
        <DropdownMenuShortcut className={`${className}`}>
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
};

export default MenuItems;
