import {
  DegreeType,
  EmploymentType,
  FieldOfStudyType,
  WorkMode,
} from "@/lib/enum/enums";

export interface ProjectType {
  id: number;
  projectName: string;
  projectGithub: string;
  projectThumbnail: string | null;
  projectLiveLink: string | null;
  isFeature: boolean;
  stack: string;
  projectSummary: string;
}
export interface EducationType {
  id: number;
  startDate: Date;
  instituteName: string;
  degree: DegreeType;
  fieldOfStudy: FieldOfStudyType;
  endDate: Date | null;
}
export interface ExperienceType {
  id: number;
  startDate: Date;
  endDate: Date | null;
  companyName: string;
  currentWorkStatus: boolean;
  description: string;
  address: string;
  workMode: WorkMode;
  EmploymentType: EmploymentType;
  designation: string;
}

export interface UserType {
  firstName: string;
  lastName:string;
  id: string;
  email: string;
  skills: string[];
  contactEmail: string | null;
  resume: string | null;
  avatar: string | null;
  aboutMe: string | null;
  experience: ExperienceType[];
  education: EducationType[];
  project: ProjectType[];
  resumeUpdateDate: Date | null;
  githubLink: string | null;
  portfolioLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  discordLink: string | null;
}

export type ApplicantState = {
  Applicant: UserType | null;
  loading: boolean;
  getApplicantInfo: (username: string) => Promise<void>;
};
