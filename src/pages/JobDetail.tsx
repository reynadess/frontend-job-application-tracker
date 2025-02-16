import Job from "@/components/JobCard";
import JobDetailsCard from "@/components/JobDetailsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyJobs } from "@/DummyData/Jobs";

const JobDetail = () => {
  return (
    <div className="p-1 flex mt-7  rounded-md">
      <div className="space-y-4 max-w-2xl rounded-md sm:block hidden">
        <ScrollArea className="h-[80vh] p-2 w-[400px]">
          {dummyJobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </ScrollArea>
      </div>
      <div className="max-w-5xl">
        <JobDetailsCard />
      </div>
    </div>
  );
};

export default JobDetail;
