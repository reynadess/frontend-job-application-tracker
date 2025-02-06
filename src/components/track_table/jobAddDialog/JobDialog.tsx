import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import JobTitle from "./subComponents/JobTitle";
import JobStatus from "./subComponents/JobStatus";
import JobPriority from "./subComponents/JobPriority";
import JobLabels from "./subComponents/JobLabels";
import { FormProvider, useForm } from "react-hook-form";
import { jobFormSchema, JobsFormSchemaData } from "@/schema/jobsDialogSchma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { useToast } from "@/hooks/use-toast";
import { useOpenDialogStore } from "@/hooks/zustand/useOpenDialogStore";
import { useState } from "react";
import { JobApplication } from "@/DummyData/Data";
import { generateRandomThreeDigitNumber } from "@/functions/generateRandomNumber";
import { Loader2 } from "lucide-react";

const JobDialog = () => {
  const methods = useForm<JobsFormSchemaData>({
    resolver: zodResolver(jobFormSchema),
  });
  const { addJob } = useJobsDataStore();
  const { handleSubmit, reset } = methods;
  const { toast } = useToast();
  const { isOpen, setIsOpen } = useOpenDialogStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: JobsFormSchemaData) => {
    console.log(data);
    const newJob: JobApplication = {
      id: `Task-${generateRandomThreeDigitNumber()}`,
      jobPosition: data.title,
      status: data.status,
      priority: data.priority,
      labels: data.label,
      isFavourite: false,
      companyName: data.companyName,
      location: data.location,
      dateSaved: "",
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
      console.log(error);
      toast({
        variant: "destructive",
        title:"Failed to add the job",
        description: "Something went wrong!",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Job</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Job</DialogTitle>
          <DialogDescription>
            Fill the form to track a new job
          </DialogDescription>
          <div className="mt-4">
            <Separator className="mt-3" />
          </div>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-8">
              <div className="grid grid-cols-2 gap-5">
                <JobTitle />
                <JobStatus />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-6">
                <JobPriority />
                <JobLabels />
              </div>
            </div>
            <DialogFooter className="mb-4 mt-9">
              <DialogClose asChild>
                <Button type="button" className="px-9" variant={"secondary"}>
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding
                    Job...
                  </>
                ) : (
                  "Add New Job"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
