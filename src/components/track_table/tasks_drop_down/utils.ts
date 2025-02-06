import { JobApplication } from "@/DummyData/Data";
import { kind } from "./types";
import { useTasksDataStoreInterface } from "@/hooks/zustand/useJobsDataStore";
import { Toast, ToasterToast } from "@/hooks/use-toast";
import { generateRandomThreeDigitNumber } from "@/functions/generateRandomNumber";

export async function handleMenuItemClick(
  kind: kind,
  jobs: JobApplication[] | null,
  selectedJob: JobApplication | null,
  updateJobs: useTasksDataStoreInterface["updateJobs"],
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  }
) {
  if (!jobs || !selectedJob) return;
  switch (kind) {
    case "favorite":
      const jobToUpdate: JobApplication = {
        ...selectedJob,
        isFavourite: !selectedJob.isFavourite,
      };
      const updateJobsArray = jobs.map((job) =>
        job.id === selectedJob.id ? jobToUpdate : job
      );
      const favoriteResult = await updateJobs(updateJobsArray);
      if (!favoriteResult.success) {
        toast({
          variant: "destructive",
          title: "Operation Failed!",
          description: "Somthing went wrong!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Job Updated!",
          description: favoriteResult.message,
        });
      }

      break;
    case "copy":
      const jobToCopy: JobApplication = {
        ...selectedJob,
        id: `jobs-${generateRandomThreeDigitNumber()}`,
        jobPosition: `${selectedJob.jobPosition} (Copy)`,
      };
      const updateJobsArrayCopy = [...jobs, jobToCopy];
      const copyResult = await updateJobs(updateJobsArrayCopy);
      if (!copyResult.success) {
        toast({
          variant: "destructive",
          title: "Operation Failed!",
          description: "Something went wrong!",
        });
      } else {
        toast({
          variant: "default",
          title: "Job Copied!",
          description: copyResult.message,
        });
      }
      break;

    case "delete":
      const updateJobsArrayDelete = jobs.filter(
        (job) => job.id !== selectedJob.id
      );
      const deleteResult = await updateJobs(updateJobsArrayDelete);
      toast({
        variant: deleteResult.success ? "default" : "destructive",
        title: deleteResult.success
          ? "Deletion Successfull!"
          : "Deletion failed!",
        description: deleteResult.message,
      });
      break;
    default:
      break;
  }
}