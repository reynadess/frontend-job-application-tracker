import React, { useState, useMemo } from 'react';
import { Job, dummyJobs } from '@/DummyData/Jobs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-separator';
import { Map, Search, StarsIcon, Filter, X } from 'lucide-react';
import JobCard from '@/components/JobCard';
import FilterPage from '@/components/FilterPage';
import { Link } from 'react-router-dom';

// Define filter state type
type FilterState = {
  jobType: Job['jobType'][];
  experience: Job['experience'][];
  salary: string[];
  industry: Job['industry'][];
};

const GlobalJobs: React.FC = () => {
  // State for search and filters
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    jobType: [],
    experience: [],
    salary: [],
    industry: [],
  });

  // Filtering logic with strong typing
  const filteredJobs = useMemo(() => {
    return dummyJobs.filter((job) => {
      // Title search
      const matchesTitle = job.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());

      // Location search
      const matchesLocation = job.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

      // Filter checks with type safety
      const matchesJobType =
        appliedFilters.jobType.length === 0 ||
        appliedFilters.jobType.includes(job.jobType);

      const matchesExperience =
        appliedFilters.experience.length === 0 ||
        appliedFilters.experience.includes(job.experience);

      const matchesSalary =
        appliedFilters.salary.length === 0 ||
        appliedFilters.salary.some((salaryRange) => {
          const [min, max] = salaryRange.split('-').map(Number);
          return job.salary >= min && job.salary <= max;
        });

      const matchesIndustry =
        appliedFilters.industry.length === 0 ||
        appliedFilters.industry.includes(job.industry);

      return (
        matchesTitle &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesSalary &&
        matchesIndustry
      );
    });
  }, [searchTitle, searchLocation, appliedFilters]);

  // Handle filter application
  const handleApplyFilters = (filters: FilterState) => {
    setAppliedFilters(filters);
  };

  // Clear all filters and search
  const clearAllFilters = () => {
    setSearchTitle('');
    setSearchLocation('');
    setAppliedFilters({
      jobType: [],
      experience: [],
      salary: [],
      industry: [],
    });
  };

  return (
    <div className="mx-auto px-4 py-6">
      <div className="w-full rounded-lg border">
        <div className="p-6">
          <h1 className="mb-6 flex items-center text-3xl font-bold">
            Find Your Dream Job Here{' '}
            <StarsIcon className="ml-2 text-yellow-500" />
          </h1>

          {/* Search Section */}
          <div className="rounded-xl border p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="rounded-full border-gray-300 py-2 pl-10 transition-all focus:border-blue-500"
                  placeholder="Job Title or Keyword"
                />
              </div>

              <Separator orientation="vertical" className="h-10 border-l" />

              <div className="relative flex-1">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="rounded-full border-gray-300 py-2 pl-10 transition-all focus:border-blue-500"
                  placeholder="Country or City"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 rounded-full px-4 py-2"
              >
                <Filter className="h-5 w-5" />
                Filters
              </Button>

              <Button
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Search
              </Button>
            </div>

            {/* Active Filters Display */}
            {(searchTitle ||
              searchLocation ||
              Object.values(appliedFilters).some((arr) => arr.length > 0)) && (
              <div className="mt-4 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Active Filters:</span>
                {searchTitle && (
                  <div className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    Title: {searchTitle}
                    <X
                      className="ml-1 h-4 w-4 cursor-pointer"
                      onClick={() => setSearchTitle('')}
                    />
                  </div>
                )}
                {searchLocation && (
                  <div className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    Location: {searchLocation}
                    <X
                      className="ml-1 h-4 w-4 cursor-pointer"
                      onClick={() => setSearchLocation('')}
                    />
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Jobs and Filters Section */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            {/* Filters */}
            <div
              className={`${
                isFilterOpen ? 'col-span-3' : 'col-span-0'
              } transform transition-all duration-1000`}
            >
              {isFilterOpen && (
                <FilterPage
                  onApplyFilters={handleApplyFilters}
                  currentFilters={appliedFilters}
                />
              )}
            </div>

            {/* Job Listings */}

            <div
              className={` ${
                isFilterOpen ? 'col-span-9' : 'col-span-12'
              } transition-all duration-1000`}
            >
              <h3 className="mb-4 text-xl font-semibold">
                {filteredJobs.length} Recommended Jobs
              </h3>
              <div className="grid h-[65vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <Link to={`/job/details/${job._id}`}>
                    <JobCard key={job._id} job={job} />
                  </Link>
                ))}
                {filteredJobs.length === 0 && (
                  <div className="col-span-2 py-10 text-center text-gray-500">
                    No jobs match your search and filter criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalJobs;
