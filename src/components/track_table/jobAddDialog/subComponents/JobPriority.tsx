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
import { ArrowDown, ArrowRight, ArrowUp, LucideIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Priority = {
  value: JobApplication["priority"];
  icon: LucideIcon;
};

const priorities: Priority[] = [
  { value: "High", icon: ArrowUp },
  { value: "Medium", icon: ArrowRight },
  { value: "Low", icon: ArrowDown },
];

const JobPriority = () => {
  const { control } = useFormContext<JobsFormSchemaData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Priority</Label>
      <Controller
        name="priority"
        defaultValue="High"
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: JobsFormSchemaData["priority"]) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {priorities.map((priority, index) => (
                    <SelectItem key={index} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <priority.icon size={15} />
                        <span>{priority.value}</span>
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

export default JobPriority;
