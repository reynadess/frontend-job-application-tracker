import React, { useState, useMemo } from "react";
import { Job, dummyJobs } from "@/DummyData/Jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Map, Search, StarsIcon, Filter, X } from "lucide-react";
import JobCard from "@/components/JobCard";
import FilterPage from "@/components/FilterPage";
import { Link } from "react-router-dom";


// Define filter state type
type FilterState = {
  jobType: Job["jobType"][];
  experience: Job["experience"][];
  salary: string[];
  industry: Job["industry"][];
};

const GlobalJobs: React.FC = () => {
  // State for search and filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
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
          const [min, max] = salaryRange.split("-").map(Number);
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
    setSearchTitle("");
    setSearchLocation("");
    setAppliedFilters({
      jobType: [],
      experience: [],
      salary: [],
      industry: [],
    });
  };

  return (
    <div className=" mx-auto px-4 py-6">
      <div className="border rounded-lg w-full">
        <div className="p-6">
          <h1 className="flex items-center text-3xl font-bold  mb-6">
            Find Your Dream Job Here{" "}
            <StarsIcon className="ml-2 text-yellow-500" />
          </h1>

          {/* Search Section */}
          <div className="border p-4 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="pl-10 py-2 rounded-full border-gray-300 focus:border-blue-500 transition-all"
                  placeholder="Job Title or Keyword"
                />
              </div>

              <Separator orientation="vertical" className="h-10 border-l" />

              <div className="relative flex-1">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 py-2 rounded-full border-gray-300 focus:border-blue-500 transition-all"
                  placeholder="Country or City"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className=" rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </Button>

              <Button
                type="submit"
                className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
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
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                    Title: {searchTitle}
                    <X
                      className="ml-1 w-4 h-4 cursor-pointer"
                      onClick={() => setSearchTitle("")}
                    />
                  </div>
                )}
                {searchLocation && (
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                    Location: {searchLocation}
                    <X
                      className="ml-1 w-4 h-4 cursor-pointer"
                      onClick={() => setSearchLocation("")}
                    />
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 "
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
                isFilterOpen ? "col-span-3" : "col-span-0"
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
                className={`  ${
                  isFilterOpen ? "col-span-9" : "col-span-12"
                } transition-all duration-1000`}
              >
                <h3 className="text-xl font-semibold mb-4">
                  {filteredJobs.length} Recommended Jobs
                </h3>
                <div className="h-[65vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <Link to={`/job/details/${job._id}`}>
                      <JobCard key={job._id} job={job} />
                    </Link>
                  ))}
                  {filteredJobs.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-10">
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
