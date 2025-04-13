import CurrentJobCard from "@/components/CurrentJobCard";
import TableJob from "@/components/JobTable/Table";
import { dummyJobs } from "@/DummyData/Jobs";
import { Link } from "react-router-dom";
const JobTracker = () => {
  return (
    <>
      <div className="space-y-4 ml-7">
        <h1 className="text-2xl font-bold">Current Openings</h1>
        <div className="flex gap-10">
            { dummyJobs.slice(0, 3).map((job) => (
            <Link to={`/job/details/${job._id}`} key={job._id}>
              <CurrentJobCard job={job} />
            </Link>
            ))}
        </div>
      </div>
      <div className="mt-12">
        <h1 className=" ml-7 text-2xl font-bold mb-3">Tracker</h1>
        <TableJob />
      </div>
    </>
  );
};

export default JobTracker;
