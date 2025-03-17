import StatusCard from "@/components/StatusCard";
import { JobApplicationSheet } from "@/components/track_table/jobAddDialog/JobDialog";
import TrackArea from "@/components/track_table/TrackArea";

import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";

import { useEffect } from "react";

const JobTracker = () => {
  const { fetchJobs } = useJobsDataStore();
  useEffect(() => {
    fetchJobs();
  }, []); //it will run only once when the component mounts for getting the data (loading the data)

  return (
    <>
      <header>
        <StatusCard />
        <div className="ml-7">
          <JobApplicationSheet />
        </div>
        <TrackArea />
      </header>
    </>
  );
};

export default JobTracker;
