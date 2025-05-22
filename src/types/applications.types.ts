import { userApplicationTypes } from "@/schema/userApplications";

export enum ApplicationStatus {
  Apply = "Apply",
  Applied = "Applied",
  InProgress = "InProgress",
  Offered = "Offered",
  Rejected = "Rejected",
  Accepted = "Accepted",
  Interview = "Interview",
}
export interface ApplicationsType {
    id: number;
    role: string;
    company?: string;
    jobLink: string;
    city?: string;
    state?: string;
    country?: string;
    status: ApplicationStatus;
    description?: string;
    appliedDate?: string | Date;
    salary?:string
}

export type ApplicationsState = {
  Applications: ApplicationsType[] | [];
  createApplication: (application: userApplicationTypes) => Promise<void>;
  getAllUserApplications: () => Promise<void>;
  getApplicationById : (id : number) => Promise<void>;
  loading: boolean;
};
