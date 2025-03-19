import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the job status types
export type JobStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "accepted";

// Status options
export const statusOptions = [
  { name: "Applied", uid: "applied" as JobStatus },
  { name: "Interview", uid: "interview" as JobStatus },
  { name: "Offer", uid: "offer" as JobStatus },
  { name: "Rejected", uid: "rejected" as JobStatus },
  { name: "Accepted", uid: "accepted" as JobStatus },
];

// Define the job interface
export interface Job {
  id: number;
  company: string;
  companyLogo: string;
  position: string;
  salary: string;
  appliedDate: string;
  status: JobStatus;
  location: string;
  description: string;
  notes: string;
}

// Define the form data interface
export interface JobFormData {
  company: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
  status: JobStatus;
  description: string;
  notes: string;
}

// Define the component props
interface AddJobSheetProps {
  onAddJob?: (job: Job) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function JobApplicationSheet({
  onAddJob,
  open,
  onOpenChange,
}: AddJobSheetProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(open || false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Handle controlled/uncontrolled state
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  // Set up form with TypeScript types
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobFormData>({
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      location: "",
      description: "",
      notes: "",
      status: "applied",
      appliedDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = (data: JobFormData) => {
    // Generate company logo (initials) from company name
    const companyLogo = data.company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newJob: Job = {
      id: Date.now(), // Generate a unique ID
      ...data,
      companyLogo,
    };

    onAddJob?.(newJob);
    handleOpenChange(false);
    reset();
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setValue("appliedDate", format(selectedDate, "yyyy-MM-dd"));
    }
  };

  // Use controlled component if provided open prop
  const sheetOpen = open !== undefined ? open : isOpen;
  const sheetOnOpenChange =
    onOpenChange !== undefined ? onOpenChange : handleOpenChange;

  return (
    <Sheet open={sheetOpen} onOpenChange={sheetOnOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8">
          <Plus className="mr-2 h-4 w-4" /> Add Job
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Job Application</SheetTitle>
          <SheetDescription>
            Track a new job application in your job search.
          </SheetDescription>
        </SheetHeader>
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
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="Enter job position"
                {...register("position", { required: "Position is required" })}
              />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                placeholder="e.g. $75,000"
                {...register("salary")}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Remote, New York, NY"
                {...register("location")}
              />
            </div>

            {/* Applied Date */}
            <div className="space-y-2">
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
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue="applied"
                onValueChange={(value: JobStatus) => setValue("status", value)}
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
            </div>

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

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about the application"
                className="min-h-20"
                {...register("notes")}
              />
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Add Job
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
