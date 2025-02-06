import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  LucideIcon,
  PlusCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useCheckedPrioritiesStore } from "@/hooks/zustand/useCheckedPrioritiesStore";
import { dummyData, Priority } from "@/DummyData/Data";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";

type status = {
  value: string;
  label: string;
  icon: LucideIcon;
  count: number;
};
const statuses: status[] = [
  {
    value: "low",
    label: "Low",
    icon: ArrowDown,
    count: 0,
  },
  {
    value: "medium",
    label: "Medium",
    icon: ArrowRight,
    count: 0,
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUp,
    count: 0,
  },
];
const PriorityDropDown = () => {
  const [open, setOpen] = useState(false);
  const { checkedPriorities, setCheckedPriorities } =
    useCheckedPrioritiesStore();
  const {jobs} = useJobsDataStore();
  const updateTheSelection = (label: string) => {
    const validPriorities: Priority[] = ["Low", "Medium", "High"];
    if (!validPriorities.includes(label as Priority)) {
      console.error("Invalid priority type");
      return;
    }
    const priority = label as Priority;

    const newCheckedPriorities = checkedPriorities.includes(priority)
      ? checkedPriorities.filter((p) => p !== priority)
      : [...checkedPriorities, priority];

    setCheckedPriorities(newCheckedPriorities);
  };

  const priorityCounts: status[] = useMemo(() => {
    if (!dummyData) {
      return statuses;
    }

    // count prorities of low ,  medium and high

    const countByLow = dummyData?.filter(
      (data) => data.priority === "Low"
    ).length;
    const countByMedium = dummyData?.filter(
      (data) => data.priority === "Medium"
    ).length;
    const countByHigh = dummyData?.filter(
      (data) => data.priority === "High"
    ).length;

    // update the count of the statusarray based on the priority
    // and return it

    return statuses.map((status) => {
      switch (status.value) {
        case "low":
          return { ...status, count: countByLow };
        case "medium":
          return { ...status, count: countByMedium };
        case "high":
          return { ...status, count: countByHigh };
        default:
          return status;
      }
    });
  }, [dummyData]);
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="h-10 justify-start border-dashed px-5"
            variant={"outline"}
            size={"sm"}
          >
            <div className="flex items-center gap-4">
              {/* priority label */}
              <div className="flex items-center gap-2">
                <PlusCircle />
                <span>Priority</span>
              </div>
              {
                // show the badge if the checked priorities are not empty
                checkedPriorities.length > 0 && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-6 border-1 border-gray-300"
                    />
                    <div className="flex items-center gap-2">
                      {checkedPriorities.map((priority, index) => (
                        <Badge key={index} variant={"secondary"}>
                          {priority}
                        </Badge>
                      ))}
                    </div>
                  </>
                )
              }
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 poppins w-52"
          side="bottom"
          align="center"
        >
          {/* comand component */}
          <Command>
            <CommandInput placeholder="Change Priority..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {priorityCounts.map((prority) => (
                  <CommandItem
                    key={prority.value}
                    value={prority.value}
                    className="flex justify-between"
                    onSelect={() => updateTheSelection(prority.label)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedPriorities.includes(
                          prority.label as Priority
                        )}
                      />
                      <prority.icon />
                      <span>{prority.label}</span>
                    </div>
                    <span>{prority.count}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriorityDropDown;
