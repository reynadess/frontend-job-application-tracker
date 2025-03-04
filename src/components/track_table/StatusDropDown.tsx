import {
  BookMarkedIcon,
  LucideIcon,
  CheckCircle,
  Clock,
  Send,
  CheckCheck,
  PlusCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type status = {
  value: string;
  label: string;
  icon: LucideIcon;
  count: number;
};

type Status = "Bookmark" | "Applied" | "Applying" | "Interview" | "Accepted";
import {} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { useCheckedStatusStore } from "@/hooks/zustand/useCheckedStatusStore";
import { dummyData } from "@/DummyData/Data";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";

const statuses: status[] = [
  {
    value: "bookmark",
    label: "Bookmark",
    icon: BookMarkedIcon,
    count: 0,
  },
  {
    value: "applied",
    label: "Applied",
    icon: CheckCircle,
    count: 0,
  },
  {
    value: "applying",
    label: "Applying",
    icon: Send,
    count: 0,
  },
  {
    value: "interview",
    label: "Interview",
    icon: Clock,
    count: 0,
  },
  {
    value: "accepted",
    label: "Accepted",
    icon: CheckCheck,
    count: 0,
  },
];
const StatusDropDown = () => {
  const [open, setOpen] = useState(false);
  const { checkedStatus, setCheckedStatus } = useCheckedStatusStore();
  const { jobs } = useJobsDataStore();
  function updateTheCheckStatus(label: string) {
    // check if the label is valid
    const validStatuses: Status[] = [
      "Bookmark",
      "Applied",
      "Applying",
      "Interview",
      "Accepted",
    ];

    if (!validStatuses.includes(label as Status)) {
      console.error(`The type ${label} does not match the status types`);
      return;
    }

    // safely cast the label to Status
    const castedStatus = label as Status;

    const newCheckedStatus: Status[] = checkedStatus.includes(
      castedStatus as Status
    )
      ? checkedStatus.filter((status) => status !== castedStatus)
      : [...checkedStatus, castedStatus];
    setCheckedStatus(newCheckedStatus);
  }

  const countStatus: status[] = useMemo(() => {
    if (!dummyData) return statuses;

    return statuses.map((status) => {
      switch (status.value) {
        case "bookmark":
          return {
            ...status,
            count: dummyData.filter((data) => data.status === "Bookmark")
              .length,
          };
        case "applied":
          return {
            ...status,
            count: dummyData.filter((data) => data.status === "Applied").length,
          };
        case "applying":
          return {
            ...status,
            count: dummyData.filter((data) => data.status === "Applying")
              .length,
          };
        case "interview":
          return {
            ...status,
            count: dummyData.filter((data) => data.status === "Interview")
              .length,
          };
        case "accepted":
          return {
            ...status,
            count: dummyData.filter((data) => data.status === "Accepted")
              .length,
          };
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
                <span>Status</span>
              </div>
              {
                // show the badge if the checked status are not empty
                checkedStatus.length > 0 && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-6 border-1 border-gray-300"
                    />
                    <div className="flex items-center gap-2">
                      {checkedStatus.map((status, index) => (
                        <Badge key={index} variant={"secondary"}>
                          {status}
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
            <CommandInput placeholder="Change Status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {countStatus.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className="flex justify-between"
                    onSelect={() => {
                      updateTheCheckStatus(status.label);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedStatus.includes(status.label as Status)}
                      />
                      <status.icon />
                      <span>{status.label}</span>
                    </div>
                    <span>{status.count}</span>
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

export default StatusDropDown;
