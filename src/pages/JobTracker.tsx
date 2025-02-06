import StatusCard from "@/components/StatusCard";
import JobDialog from "@/components/track_table/jobAddDialog/JobDialog";
import TrackArea from "@/components/track_table/TrackArea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useJobsDataStore } from "@/hooks/zustand/useJobsDataStore";
import { Plus } from "lucide-react";
import { useEffect } from "react";

const JobTracker = () => {
  const { fetchJobs } = useJobsDataStore();
  useEffect(() => {
    fetchJobs();
  }, []); //it will run only once when the component mounts for getting the data (loading the data)

  return (
    <>
      <header>
        <StatusCard /> {/*TODO: navigate ti jobDialog */}
        <Dialog>
          <DialogTrigger asChild>
          <Button className="ml-7"><Plus/> Add A New Job</Button>
          </DialogTrigger>
        </Dialog>
        <TrackArea />
      </header>
    </>
  );
};

export default JobTracker;
