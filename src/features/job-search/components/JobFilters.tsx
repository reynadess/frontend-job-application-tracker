import { Search, MapPin, Filter, X } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Slider } from '@/shared/components/ui/slider';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import { Badge } from '@/shared/components/ui/badge';
import type { JobFilters } from '../types/job.types';

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function JobFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
  activeFiltersCount,
}: JobFiltersProps) {
  const updateFilter = (key: keyof JobFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{activeFiltersCount}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Job Title or Keywords</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="e.g. Frontend Developer, React"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, State or Remote"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        {/* Salary Range */}
        <div className="space-y-3">
          <Label>Minimum Salary: ${filters.salaryMin.toLocaleString()}</Label>
          <Slider
            value={[filters.salaryMin]}
            onValueChange={([value]) => updateFilter('salaryMin', value)}
            max={300000}
            min={1000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$30k</span>
            <span>$300k+</span>
          </div>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select
            value={filters.jobType}
            onValueChange={(value) => updateFilter('jobType', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) => updateFilter('experienceLevel', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Entry">Entry Level</SelectItem>
              <SelectItem value="Mid">Mid Level</SelectItem>
              <SelectItem value="Senior">Senior Level</SelectItem>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <Label>Company Size</Label>
          <Select
            value={filters.companySize}
            onValueChange={(value) => updateFilter('companySize', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="1-10">Startup (1-10)</SelectItem>
              <SelectItem value="10-50">Small (10-50)</SelectItem>
              <SelectItem value="50-100">Medium (50-100)</SelectItem>
              <SelectItem value="500-1000">Large (500-1000)</SelectItem>
              <SelectItem value="1000+">Enterprise (1000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label>Department</Label>
          <Select
            value={filters.department}
            onValueChange={(value) => updateFilter('department', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posted Within */}
        <div className="space-y-2">
          <Label>Posted Within</Label>
          <Select
            value={filters.postedWithin}
            onValueChange={(value) => updateFilter('postedWithin', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="1">Last 24 hours</SelectItem>
              <SelectItem value="3">Last 3 days</SelectItem>
              <SelectItem value="7">Last week</SelectItem>
              <SelectItem value="30">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Work Arrangement */}
        <div className="space-y-3">
          <Label>Work Arrangement</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote"
                checked={filters.remote}
                onCheckedChange={(checked) => updateFilter('remote', checked)}
              />
              <Label htmlFor="remote" className="text-sm font-normal">
                Remote work
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hybrid"
                checked={filters.hybrid}
                onCheckedChange={(checked) => updateFilter('hybrid', checked)}
              />
              <Label htmlFor="hybrid" className="text-sm font-normal">
                Hybrid work
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
