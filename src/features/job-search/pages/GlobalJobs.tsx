import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { JobCard } from "../components/JobCard"
import { JobFiltersComponent } from "../components/JobFilters"
import type { Job, JobFilters } from "../types/job.types"
import { useJobs } from "../hooks/useJobs"
import axios from "axios"
import api from "@/api/axiosInstance"
import { mockJobs } from "@/lib/job-data"

const initialFilters: JobFilters = {
  search: "",
  location: "",
  salaryMin: 50000,
  jobType: "all",
  remote: false,
  hybrid: false,
  companySize: "all",
  experienceLevel: "all",
  department: "all",
  postedWithin: "all",
}

export default function JobSearchPage() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters)
  const [sortBy, setSortBy] = useState("relevance")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  // const [jobs , setJobs] = useState<Job[]>([])
  // const {jobs, getJobList} = useJobs();





  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.location) count++
    if (filters.salaryMin > 50000) count++
    if (filters.jobType !== "all") count++
    if (filters.remote) count++
    if (filters.hybrid) count++
    if (filters.companySize !== "all") count++
    if (filters.experienceLevel !== "all") count++
    if (filters.department !== "all") count++
    if (filters.postedWithin !== "all") count++
    return count
  }, [filters])

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        !filters.search ||
        job.role.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job?.skills?.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()))

      const matchesLocation =
        !filters.location ||
        job?.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
        (filters.location.toLowerCase().includes("remote") && job.remote)

      const matchesSalary = job.ctcOffered.min >= filters.salaryMin
      const matchesType = filters.jobType === "all" || job.type === filters.jobType
      const matchesRemote = !filters.remote || job.remote
      const matchesHybrid = !filters.hybrid || job.hybrid
      const matchesCompanySize = filters.companySize === "all" || job.companySize === filters.companySize
      const matchesExperience = filters.experienceLevel === "all" || job.experienceLevel === filters.experienceLevel
      const matchesDepartment = filters.department === "all" || job.department === filters.department

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSalary &&
        matchesType &&
        matchesRemote &&
        matchesHybrid &&
        matchesCompanySize &&
        matchesExperience &&
        matchesDepartment
      )
    })
  }, [filters])

  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs]
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime())
      case "salary-high":
        return sorted.sort((a, b) => b.ctcOffered.max - a.ctcOffered.max)
      case "salary-low":
        return sorted.sort((a, b) => a.ctcOffered.min - b.ctcOffered.min)
      case "match":
        return sorted.sort((a, b) => b.skillMatch - a.skillMatch)
      default:
        return sorted.sort((a, b) => b.skillMatch - a.skillMatch)
    }
  }, [filteredJobs, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{sortedJobs.length} jobs found</h2>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                  </p>
                )}
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {sortedJobs.map((job) => (
                <JobCard key={job.id} job={job} onSave={toggleSaveJob} isSaved={savedJobs.includes(job.id)} />
              ))}
            </div>

            {/* No Results */}
            {sortedJobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more opportunities.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
