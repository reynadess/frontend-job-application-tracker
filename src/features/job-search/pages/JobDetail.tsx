import Job from '@/shared/components/JobCard';
import JobDetailsCard from '@/shared/components/JobDetailsCard';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { dummyJobs } from '@/DummyData/Jobs';
import { useState } from 'react';

const JobDetail = () => {
    const [selectedJob, setSelectedJob] = useState(dummyJobs[0]);
    
    return (
        <div className="mt-7 flex rounded-md p-1">
            <div className="hidden max-w-2xl space-y-4 rounded-md sm:block">
                <ScrollArea className="h-[90vh] w-[40vh] p-3">
                    {dummyJobs.map((job) => (
                        <div
                            className="mt-2"
                            onClick={() => setSelectedJob(job)}
                            key={job._id}
                        >
                            {' '}
                            {/*TODO: Two options either you fetch from api or store in state var this will make low number of api calls but try to implement based on api */}
                            <Job job={job} />
                        </div>
                    ))}
                </ScrollArea>
            </div>
            <div>
                <JobDetailsCard job={selectedJob} />
            </div>
        </div>
    );
};

export default JobDetail;
