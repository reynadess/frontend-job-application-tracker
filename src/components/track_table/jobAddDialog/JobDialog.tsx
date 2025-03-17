import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { useToast } from "@/hooks/use-toast";
import { useOpenDialogStore } from "@/hooks/zustand/useOpenDialogStore";
import { jobFormSchema, JobsFormSchemaData } from "@/schema/jobsDialogSchma";
import { generateRandomThreeDigitNumber } from "@/functions/generateRandomNumber";
import { JobApplication } from "@/DummyData/Data";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Import your subcomponents
import JobTitle from "./subComponents/JobTitle";
import JobStatus from "./subComponents/JobStatus";
import JobPriority from "./subComponents/JobPriority";
import JobLabels from "./subComponents/JobLabels";

export function JobApplicationSheet() {
  const methods = useForm<JobsFormSchemaData>({
    resolver: zodResolver(jobFormSchema),
  });

  const { addJob } = useJobsDataStore();
  const { handleSubmit, reset } = methods;
  const { toast } = useToast();
  const { isOpen, setIsOpen } = useOpenDialogStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: JobsFormSchemaData) => {
    setIsLoading(true);

    const newJob: JobApplication = {
      id: `Task-${generateRandomThreeDigitNumber()}`,
      jobPosition: data.title,
      status: data.status,
      priority: data.priority,
      labels: data.label,
      isFavourite: false,
      companyName: data.companyName,
      location: data.location,
      dateSaved: new Date().toISOString().split("T")[0],
      salary: data.salary,
      appliedDate: "",
      deadline: "",
      followUp: false,
    };

    try {
      const result = await addJob(newJob);
      toast({
        variant: result.success ? "default" : "destructive",
        title: result.success
          ? `The job [${newJob.id}] updated Successfully!`
          : `Failed to add the job`,
        description: result.message,
      });

      reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add the job",
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button><Plus/>Add Job</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Add Job</SheetTitle>
          <SheetDescription>Fill the form to track a new job</SheetDescription>
          <div className="mt-4">
            <Separator className="mt-3" />
          </div>
        </SheetHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <JobTitle />
                <JobStatus />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <JobPriority />
                <JobLabels />
              </div>

              {/* Additional fields from your data structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    {...methods.register("companyName")}
                    placeholder="Enter company name"
                  />
                  {methods.formState.errors.companyName && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...methods.register("location")}
                    placeholder="Enter job location"
                  />
                  {methods.formState.errors.location && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    {...methods.register("salary", { valueAsNumber: true })}
                    placeholder="Enter salary"
                  />
                  {methods.formState.errors.salary && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.salary.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <SheetFooter className="mb-4 mt-9">
              <SheetClose asChild>
                <Button type="button" className="px-9" variant="secondary">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding
                    Job...
                  </>
                ) : (
                  "Add New Job"
                )}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}

export default JobApplicationSheet;
