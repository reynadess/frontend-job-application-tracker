import React from 'react';
import { Job } from '@/DummyData/Jobs';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Function to format salary
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(salary);
  };

  // Function to get experience badge color and background
  const getExperienceStyles = (experience: Job['experience']) => {
    const variants = {
      'entry': {
        badge: 'dark:bg-gray-700 dark:text-gray-300 bg-gray-200 text-gray-800',
        card: 'dark:border-gray-700/50 border-gray-200 dark:hover:border-gray-600 hover:border-gray-300'
      },
      'mid': {
        badge: 'dark:bg-blue-900/50 dark:text-blue-300 bg-blue-100 text-blue-800',
        card: 'dark:border-blue-900/50 border-blue-100 dark:hover:border-blue-800 hover:border-blue-200'
      },
      'senior': {
        badge: 'dark:bg-green-900/50 dark:text-green-300 bg-green-100 text-green-800',
        card: 'dark:border-green-900/50 border-green-100 dark:hover:border-green-800 hover:border-green-200'
      },
      'executive': {
        badge: 'dark:bg-purple-900/50 dark:text-purple-300 bg-purple-100 text-purple-800',
        card: 'dark:border-purple-900/50 border-purple-100 dark:hover:border-purple-800 hover:border-purple-200'
      }
    };
    return variants[experience];
  };

  const experienceStyles = getExperienceStyles(job.experience);

  return (
    <div className={`
      group relative overflow-hidden
      border rounded-xl p-5 
      bg-white dark:bg-gray-900/80 
      ${experienceStyles.card}
      transition-all duration-300 
      hover:shadow-lg 
      dark:hover:shadow-2xl dark:hover:shadow-blue-900/20
      space-y-3
    `}>
      {/* Job Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {job.title}
        </h2>
        <Badge 
          className={`
            ${experienceStyles.badge} 
            text-xs px-2 py-1 rounded-full
          `}
        >
          {job.experience.charAt(0).toUpperCase() + job.experience.slice(1)} Level
        </Badge>
      </div>

      {/* Company Details */}
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
        <Briefcase className="w-4 h-4" />
        <span className="text-sm">{job.company}</span>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-500">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4" />
          <span>{formatSalary(job.salary)} / year</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{job.jobType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {job.skills.slice(0, 3).map((skill, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="
              text-xs 
              dark:bg-gray-800 
              dark:text-gray-300 
              dark:border-gray-700 
              bg-gray-100 
              text-gray-700
            "
          >
            {skill}
          </Badge>
        ))}
      </div>

      {/* Job Actions */}
      <div className="flex justify-between items-center pt-3 border-t dark:border-gray-800">
        <div className="flex items-center text-yellow-500">
          <Star className="w-4 h-4 mr-1" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Posted {job.postedDate}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="
              dark:bg-gray-800 
              dark:text-gray-300 
              dark:border-gray-700 
              dark:hover:bg-gray-700
            "
          >
            Save
          </Button>
          <Button 
            size="sm"
            className="
              bg-blue-600 
              hover:bg-blue-700 
              dark:bg-blue-800 
              dark:hover:bg-blue-700
            "
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-br 
        from-gray-100/10 
        via-transparent 
        to-gray-200/10 
        dark:from-gray-900/20 
        dark:via-transparent 
        dark:to-gray-900/30 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-300 
        pointer-events-none
      "></div>
    </div>
  );
};

export default JobCard;