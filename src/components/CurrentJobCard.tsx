import React from 'react';
import { Job } from '@/DummyData/Jobs';
import { Briefcase, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobCardProps {
    job: Job;
}

const CurrentJobCard: React.FC<JobCardProps> = ({ job }) => {
    // Function to format salary
    const formatSalary = (salary: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
        }).format(salary);
    };

    // Function to get experience badge color and background
    const getExperienceStyles = (experience: Job['experience']) => {
        const variants = {
            entry: {
                badge: 'dark:bg-gray-700 dark:text-gray-300 bg-gray-200 text-gray-800',
                card: 'dark:border-gray-700/50 border-gray-200 dark:hover:border-gray-600 hover:border-gray-300',
            },
            mid: {
                badge: 'dark:bg-blue-900/50 dark:text-blue-300 bg-blue-100 text-blue-800',
                card: 'dark:border-blue-900/50 border-blue-100 dark:hover:border-blue-800 hover:border-blue-200',
            },
            senior: {
                badge: 'dark:bg-green-900/50 dark:text-green-300 bg-green-100 text-green-800',
                card: 'dark:border-green-900/50 border-green-100 dark:hover:border-green-800 hover:border-green-200',
            },
            executive: {
                badge: 'dark:bg-purple-900/50 dark:text-purple-300 bg-purple-100 text-purple-800',
                card: 'dark:border-purple-900/50 border-purple-100 dark:hover:border-purple-800 hover:border-purple-200',
            },
        };
        return variants[experience];
    };

    const experienceStyles = getExperienceStyles(job.experience);

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border bg-white p-5 dark:bg-gray-900/80 ${experienceStyles.card} space-y-3 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-900/20`}
        >
            {/* Job Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {job.title}
                </h2>
                <Badge
                    className={` ${experienceStyles.badge} rounded-full px-2 py-1 text-xs`}
                >
                    {job.experience.charAt(0).toUpperCase() +
                        job.experience.slice(1)}{' '}
                    Level
                </Badge>
            </div>

            {/* Company Details */}
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{job.company}</span>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-500">
                <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatSalary(job.salary)} / year</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                        {job.jobType
                            .replace('-', ' ')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                </div>
            </div>
            {/* Job Actions */}
            <div className="flex items-center justify-between border-t pt-3 dark:border-gray-800">
                <div className="flex items-center text-yellow-500">
                    <Star className="mr-1 h-4 w-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Posted {job.postedDate}
                    </span>
                </div>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-100/10 via-transparent to-gray-200/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/30"></div>
        </div>
    );
};

export default CurrentJobCard;
