import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApplicationsStore } from "@/hooks/zustand/store/useApplicationsStore";
import {
  ApplicationStatus,
  ApplicationsType,
} from "@/types/applications.types";
import { toast } from "sonner";
import { userApplicationTypes } from "@/schema/userApplications";

interface Props {
  selectedApplication?: ApplicationsType | null;
  handleClose: () => void;
}

//FIXME : status dropdown options
// Status options
// type StatusOptions = {
//   name: string;
//   uid: ApplicationStatus;
// };

// const statusOptions: StatusOptions[] = [
//   { name: "Applied", uid: ApplicationStatus.Applied },
//   { name: "Interview", uid: ApplicationStatus.Interview },
//   { name: "Offered", uid: ApplicationStatus.Offered },
//   { name: "Rejected", uid: ApplicationStatus.Rejected },
//   { name: "Accepted", uid: ApplicationStatus.Accepted },
//   { name: "Apply", uid: ApplicationStatus.Apply },
//   { name: "InProgress", uid: ApplicationStatus.InProgress },
// ];

export function JobApplicationSheet({
  selectedApplication,
  handleClose,
}: Props) {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { createApplication } = useApplicationsStore();

  // Set up form with TypeScript types
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<userApplicationTypes>({
    defaultValues: {
      company: "",
      role: "",
      // salary: "",
      city: "",
      state: "",
      country: "",
      description: "",
      //FIXME: Fixme after we  have status and applied date given by user
      // status: ApplicationStatus.Apply,
      // appliedDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = async (data: userApplicationTypes) => {
    // Generate company logo (initials) from company name
    setIsSubmitting(true);
    try {
      await createApplication(data);
    } catch (error) {
      toast.error("Try again");
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
    // reset();
  };

  // Populate form when selectedApplication changes
  useEffect(() => {
    if (selectedApplication) {
      // Set form values from the selected application
      setValue("company", selectedApplication.company || "");
      setValue("role", selectedApplication.role || "");
      setValue("city", selectedApplication.city || "");
      setValue("state", selectedApplication.state || "");
      setValue("country", selectedApplication.country || "");
      setValue("description", selectedApplication.description || "");
      setValue("jobLink", selectedApplication.jobLink || "");
    }
  }, [selectedApplication, setValue]);

  // const handleDateChange = (selectedDate: Date | undefined) => {
  //   setDate(selectedDate);
  //   if (selectedDate) {
  //     setValue("appliedDate", format(selectedDate, "yyyy-MM-dd"));
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
      <div className="space-y-4">
        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Enter company name"
            {...register("company", { required: "Company is required" })}
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="role">Position</Label>
          <Input
            id="role"
            placeholder="Enter job position"
            {...register("role", { required: "Position is required" })}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Salary */}
        {/* <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            placeholder="e.g. $75,000"
            {...register("salary")}
          />
        </div> */}

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. Remote, New York, NY"
            {...register("city")}
          />
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="e.g. Remote, New York, NY"
              {...register("state")}
            />
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g. Remote, New York, NY"
                {...register("country")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobLink">Job Link</Label>
              <Input
                id="jobLink"
                placeholder="https://www.company.com/about/careers/applications/jobs-software-engineer-phd-early-career-campus-systems-and-infrastructure-2025-start"
                {...register("jobLink")}
              />
            </div>

            {/* Applied Date */}
            {/* <div className="space-y-2">
          <Label htmlFor="appliedDate">Applied Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div> */}

            {/* Status */}
            {/* <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue={ApplicationStatus.Apply}
            onValueChange={(value: ApplicationStatus) =>
              setValue("status", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.uid} value={status.uid}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the role"
                className="min-h-20"
                {...register("description")}
              />
            </div>
          </div>

          <div className="py-4 flex gap-4 justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Please wait..."
                : `${
                    selectedApplication?.id
                      ? "Update Application"
                      : "Add Application"
                  }`}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
