import Job from "@/components/JobCard";
import JobDetailsCard from "@/components/JobDetailsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyJobs } from "@/DummyData/Jobs";
import { useState } from "react";

const JobDetail = () => {
  const [selectedJob, setSelectedJob] = useState(dummyJobs[0]);

  return (
    <div className="p-1 flex mt-7 rounded-md">
      <div className="space-y-4 max-w-2xl rounded-md sm:block hidden">
        <ScrollArea className="h-[90vh] p-3 w-[40vh] ">
          {dummyJobs.map((job) => (
            <div className="mt-2" onClick={() => setSelectedJob(job)} key={job._id}> {/*TODO: Two options either you fetch from api or store in state var this will make low number of api calls but try to implement based on api */}
              <Job job={job} />
            </div>
          ))}
        </ScrollArea>
      </div>
      <div >
        <JobDetailsCard job={selectedJob} />
      </div>
    </div>
  );
};

export default JobDetail;