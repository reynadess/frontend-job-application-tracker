import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobApplication } from "@/DummyData/Data";
import { JobsFormSchemaData } from "@/schema/jobsDialogSchma";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  BookMarkedIcon,
  Calendar,
  Check,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

type Status = {
  value: JobApplication["status"];
  icon: LucideIcon;
};

const statuses: Status[] = [
  { value: "Applied", icon: Check },
  { value: "Interview", icon: Calendar },
  { value: "Bookmark", icon: BookMarkedIcon },
  { value: "Accepted", icon: CheckCircle },
];

const JobStatus = () => {
  const { control } = useFormContext<JobsFormSchemaData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Task Status</Label>
      <Controller
        name="status"
        defaultValue="Applied"
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: JobsFormSchemaData["status"]) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statuses.map((status, index) => (
                    <SelectItem key={index} value={status.value}>
                      <div className="flex items-center gap-2">
                        <status.icon size={15} />
                        <span>{status.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
};

export default JobStatus;
