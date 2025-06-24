export interface Job {
  id: number
  title: string
  company: string
  location: string
  remote: boolean
  hybrid?: boolean
  salary: {
    min: number
    max: number
    currency: string
  }
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  posted: string
  skills: string[]
  companySize: string
  skillMatch: number
  description: string
  benefits: string[]
  companyRating: number
  companyReviews: number
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead" | "Executive"
  department: string
  applicationDeadline?: string
  isUrgent?: boolean
  isSponsored?: boolean
}

export interface JobDetails extends Job {
  requirements: string[]
  niceToHave: string[]
  companyInfo: {
    about: string
    culture: string
    perks: string[]
    website: string
    industry: string
    founded: number
    headquarters: string
  }
  applicationProcess: string[]
  similarJobs?: Job[]
}

export interface JobFilters {
  search: string
  location: string
  salaryMin: number
  jobType: string
  remote: boolean
  hybrid: boolean
  companySize: string
  experienceLevel: string
  department: string
  postedWithin: string
}
