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
    ctcOffered?:number
}


export type StatusOptions = {
  name: string;
  uid: ApplicationStatus;
};

export const Status_Options: StatusOptions[] = [
  { name: "Applied", uid: ApplicationStatus.Applied },
  { name: "Interview", uid: ApplicationStatus.Interview },
  { name: "Offered", uid: ApplicationStatus.Offered },
  { name: "Rejected", uid: ApplicationStatus.Rejected },
  { name: "Accepted", uid: ApplicationStatus.Accepted },
  { name: "Apply", uid: ApplicationStatus.Apply },
  { name: "InProgress", uid: ApplicationStatus.InProgress },
];

export type ApplicationsState = {
  Applications: ApplicationsType[] | [];
  createApplication: (application: userApplicationTypes) => Promise<void>;
  getAllUserApplications: () => Promise<void>;
  getApplicationById : (id : number) => Promise<void>;
  deleteApplicationById : (id : number) => Promise<void>;
  //FIXME :Fix the type
  updateApplicationById : (id : number , updatedData : any) => Promise<void>;
  loading: boolean;
};
