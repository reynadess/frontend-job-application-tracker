// src/DummyData/Data.tsx
export type Label = "Urgent" | "Remote" | "On-site";
export type Priority = "Low" | "Medium" | "High";
export type Status =
  | "Applying"
  | "Applied"
  | "Bookmark"
  | "Interview"
  | "Accepted";

export interface JobApplication {
  id: string;
  companyName: string;
  jobPosition: string;
  salary: number;
  location: string;
  deadline: string;
  appliedDate: string;
  followUp: boolean;
  dateSaved: string;
  status: Status;
  labels: Label;
  priority: Priority;
  isFavourite: boolean;
}

export const dummyData: JobApplication[] = [
  {
    id: "1",
    companyName: "Tech Corp",
    jobPosition: "Software Engineer",
    salary: 90000,
    location: "New York, NY",
    deadline: "2023-11-01",
    appliedDate: "2023-10-15",
    followUp: true,
    dateSaved: "2023-10-10",
    status: "Applied",
    labels: "Urgent",
    priority: "High",
    isFavourite: true,
  },
  {
    id: "2",
    companyName: "Innovate LLC",
    jobPosition: "Frontend Developer",
    salary: 85000,
    location: "San Francisco, CA",
    deadline: "2023-11-10",
    appliedDate: "2023-10-20",
    followUp: false,
    dateSaved: "2023-10-18",
    status: "Applying",
    labels: "On-site",
    priority: "Medium",
    isFavourite: false,
  },
  {
    id: "3",
    companyName: "Web Solutions",
    jobPosition: "Backend Developer",
    salary: 80000,
    location: "Austin, TX",
    deadline: "2023-11-15",
    appliedDate: "2023-10-25",
    followUp: true,
    dateSaved: "2023-10-22",
    status: "Interview",
    labels: "Remote",
    priority: "High",
    isFavourite: true,
  },
  {
    id: "4",
    companyName: "Creative Minds",
    jobPosition: "Full Stack Developer",
    salary: 95000,
    location: "Seattle, WA",
    deadline: "2023-11-20",
    appliedDate: "2023-10-30",
    followUp: false,
    dateSaved: "2023-10-28",
    status: "Accepted",
    labels: "On-site",
    priority: "Low",
    isFavourite: false,
  },
];
