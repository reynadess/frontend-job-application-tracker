import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FilterPage: React.FC<{
  onApplyFilters: (filters: any) => void;
  currentFilters?: any;
}> = ({ onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    jobType: currentFilters?.jobType || [],
    experience: currentFilters?.experience || [],
    salary: currentFilters?.salary || [],
    industry: currentFilters?.industry || [],
  });

  // Job Type Options
  const jobTypeOptions = [
    { label: 'Full Time', value: 'full-time' },
    { label: 'Part Time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Freelance', value: 'freelance' },
  ];

  // Experience Level Options
  const experienceOptions = [
    { label: 'Entry Level', value: 'entry' },
    { label: 'Mid Level', value: 'mid' },
    { label: 'Senior Level', value: 'senior' },
    { label: 'Executive', value: 'executive' },
  ];

  // Salary Range Options
  const salaryRanges = [
    { label: '$0 - $50K', value: '0-50000' },
    { label: '$50K - $100K', value: '50000-100000' },
    { label: '$100K - $150K', value: '100000-150000' },
    { label: '$150K+', value: '150000-1000000' },
  ];

  // Industry Options
  const industryOptions = [
    { label: 'Technology', value: 'tech' },
    { label: 'Finance', value: 'finance' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Education', value: 'education' },
    { label: 'Marketing', value: 'marketing' },
  ];

  // Helper function to toggle filter
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  // Apply filters
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      jobType: [],
      experience: [],
      salary: [],
      industry: [],
    });
    onApplyFilters({
      jobType: [],
      experience: [],
      salary: [],
      industry: [],
    });
  };

  return (
    <motion.div
      initial={{ x: 300, y: -100, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: 300, y: -100, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      }}
      className="space-y-6 rounded-lg border p-4"
    >
      {/* Job Type Filter */}
      <div>
        <h4 className="mb-3 font-semibold">Job Type</h4>
        <div className="space-y-2">
          {jobTypeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`job-type-${option.value}`}
                checked={filters.jobType.includes(option.value)}
                onCheckedChange={() => toggleFilter('jobType', option.value)}
              />
              <Label htmlFor={`job-type-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div>
        <h4 className="mb-3 font-semibold">Experience Level</h4>
        <div className="space-y-2">
          {experienceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`experience-${option.value}`}
                checked={filters.experience.includes(option.value)}
                onCheckedChange={() => toggleFilter('experience', option.value)}
              />
              <Label htmlFor={`experience-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range Filter */}
      <div>
        <h4 className="mb-3 font-semibold">Salary Range</h4>
        <div className="space-y-2">
          {salaryRanges.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`salary-${option.value}`}
                checked={filters.salary.includes(option.value)}
                onCheckedChange={() => toggleFilter('salary', option.value)}
              />
              <Label htmlFor={`salary-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Filter */}
      <div>
        <h4 className="mb-3 font-semibold">Industry</h4>
        <div className="space-y-2">
          {industryOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`industry-${option.value}`}
                checked={filters.industry.includes(option.value)}
                onCheckedChange={() => toggleFilter('industry', option.value)}
              />
              <Label htmlFor={`industry-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Actions */}
      <div className="mt-4 flex space-x-2">
        <Button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="flex-1 border-gray-300"
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterPage;
