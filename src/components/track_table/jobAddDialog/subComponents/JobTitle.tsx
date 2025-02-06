import { Input } from "@/components/ui/input";
import { JobsFormSchemaData } from "@/schema/jobsDialogSchma";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useFormContext } from "react-hook-form";

const JobTitle = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobsFormSchemaData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Job Title</Label>
      <Input className="h-11" {...register("title")} placeholder="SDE..." />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  );
};

export default JobTitle;
