import CurrentJobCard from '@/components/CurrentJobCard';
import JobTrackingTable from '@/components/job-tracking/JobTrackingTable';
import { dummyJobs } from '@/DummyData/Jobs';
import { Link } from 'react-router-dom';
const JobTracker = () => {
    return (
        <>
            <div className="ml-7 hidden space-y-4 sm:block">
                <h1 className="text-2xl font-bold">Current Openings</h1>
                <div className="flex space-x-10 overflow-x-auto">
                    {dummyJobs.slice(0, 3).map((job) => (
                        <Link to={`/job/details/${job._id}`} key={job._id}>
                            <CurrentJobCard job={job} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-12">
                <h1 className="mb-3 ml-7 text-2xl font-bold">Tracker</h1>
                <JobTrackingTable />
            </div>
        </>
    );
};

export default JobTracker;
