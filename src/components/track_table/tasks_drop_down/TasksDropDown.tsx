import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import SubLabelMenu from "./SubLabelMenu";
import { menuItems } from "./constants";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { MenuItemType } from "./types";
import { JobApplication, Label } from "@/DummyData/Data";
import { useToast } from "@/hooks/use-toast";

const TasksDropDown = ({
  onOpen,
  onClose,
}: {
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [selectedLabel, setSelectedLabel] = useState("Urgent");
  const { selectedJob, jobs, updateJobs } = useJobsDataStore();
  const [menuItemsArray, setMenuItemsArray] =
    useState<MenuItemType[]>(menuItems);
  const { toast } = useToast();

  useEffect(() => {
    setMenuItemsArray((prev) =>
      prev.map((item) => {
        if (item.kind === "favorite") {
          return {
            ...item,
            label: selectedJob?.isFavourite ? "Unfavorite" : "Favorite",
          };
        }
        return item;
      })
    );
  }, [selectedJob]);
  useEffect(() => {
    if (selectedJob) {
      setSelectedLabel(selectedJob.labels);
    }
  }, [selectedJob]);
  const clickedLabelItem = async (newLabel: string) => {
    const validLabels: Label[] = ["On-site", "Remote", "Urgent"];
    if (!validLabels.includes(newLabel as Label)) {
      console.error(`The type ${newLabel} is incorrect`);
      return;
    }
    if (selectedJob && jobs) {
      const updateJob: JobApplication = {
        ...selectedJob,
        labels: newLabel as Label,
      };

      const updateJobsArray = jobs.map((job) =>
        job.id === selectedJob.id ? updateJob : job
      );
      try {
        const result = await updateJobs(updateJobsArray);
        toast({
          variant: result.success ? "default" : "destructive",
          title: result.success
            ? `[${selectedJob.id}] updated Successfully`
            : `[${selectedJob.id}] updated failed`,
          description: result.message,
        });
      } catch (error) {
        console.error("Failed to update jobs:", error);
      }
    }
  };
  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
    >
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <EllipsisVertical />
          {/* three dots for dropdown  trigger*/}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {menuItemsArray.map((item) => (
            <MenuItems
              key={item.label}
              kind={item.kind}
              Icon={item.icon}
              label={item.label}
              shortcut={item.shortcut}
            />
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* separtor between menu groups */}
        <DropdownMenuGroup>
          <SubLabelMenu
            value={selectedLabel}
            onClickedLabelItem={clickedLabelItem}
            onValueChange={setSelectedLabel}
            //pass state and setter to labbelSubmenu
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/*  separtor between menu groups*/}

        {/* delete the menu item with red text */}
        <MenuItems
          Icon={Trash2}
          kind={"delete"}
          label="Delete"
          shortcut="↑⌘Q"
          className="text-red-500"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TasksDropDown;
