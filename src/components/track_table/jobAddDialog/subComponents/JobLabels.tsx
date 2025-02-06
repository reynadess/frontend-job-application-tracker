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
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Label = {
  value: JobApplication["labels"];
};

const labels: Label[] = [
  { value: "Urgent" },
  { value: "Remote" },
  { value: "On-site" },
];
const JobLabels = () => {
  const { control } = useFormContext<JobsFormSchemaData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Priority</Label>
      <Controller
        name="label"
        defaultValue="On-site"
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: JobsFormSchemaData["label"]) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a Label" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {labels.map((label, index) => (
                    <SelectItem key={index} value={label.value}>
                      <div className="flex items-center gap-2">
                        <span>{label.value}</span>
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

export default JobLabels;
