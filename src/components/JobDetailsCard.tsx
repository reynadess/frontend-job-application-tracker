import React from 'react';
import { Job } from '@/DummyData/Jobs';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  CheckCircle2,
  BookmarkIcon,
  ShareIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface JobDetailsProps {
  job: Job;
}

const JobDetailsPage: React.FC<JobDetailsProps> = ({ job }) => {
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
        text: 'text-gray-800 dark:text-gray-300'
      },
      'mid': {
        badge: 'dark:bg-blue-900/50 dark:text-blue-300 bg-blue-100 text-blue-800',
        text: 'text-blue-800 dark:text-blue-300'
      },
      'senior': {
        badge: 'dark:bg-green-900/50 dark:text-green-300 bg-green-100 text-green-800',
        text: 'text-green-800 dark:text-green-300'
      },
      'executive': {
        badge: 'dark:bg-purple-900/50 dark:text-purple-300 bg-purple-100 text-purple-800',
        text: 'text-purple-800 dark:text-purple-300'
      }
    };
    return variants[experience];
  };

  const experienceStyles = getExperienceStyles(job?.experience);

  return (
    <div className=" mx-auto px-4 py-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {job.title}
              </h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-base">{job.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span className="text-base">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              >
                <BookmarkIcon className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              >
                <ShareIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Overview */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Job Type</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {job.jobType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Salary</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {formatSalary(job.salary)} / year
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                <Badge 
                  className={`
                    ${experienceStyles.badge} 
                    text-xs px-2 py-1 rounded-full
                  `}
                >
                  {job?.experience.charAt(0).toUpperCase() + job?.experience.slice(1)} Level
                </Badge>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Job Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Requirements
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="
                    text-sm 
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Posted on {job.postedDate}
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                className="
                  dark:bg-gray-800 
                  dark:text-gray-300 
                  dark:border-gray-700 
                  dark:hover:bg-gray-700
                "
              >
                Save Job
              </Button>
              <Button 
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
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsPage;