export interface UserType {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type ApplicantState = {
    Applicant: UserType | null;
    getApplicantInfo: (username: string) => Promise<void>;
    loading: boolean;
};
