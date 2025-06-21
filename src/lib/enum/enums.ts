export enum Currency {
    INR = 'INR',
    USD = 'USD',
}

export enum WorkMode {
    REMOTE = 'remote',
    HYBRID = 'hybrid',
    OFFICE = 'office',
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    HR = 'HR',
}

export enum EmploymentType {
    FULL_TIME = 'Full_time',
    PART_TIME = 'Part_time',
    INTERNSHIP = 'Internship',
    CONTRACT = 'Contract',
}

export enum DegreeType {
    BTECH = 'BTech',
    MTECH = 'MTech',
    BCA = 'BCA',
    MCA = 'MCA',
}

export enum FieldOfStudyType {
    AI = 'AI',
    MACHINE_LEARNING = 'Machine_Learning',
    CS = 'CS',
    MECHANICAL = 'Mechanical',
}

export enum ProjectStack {
    GO = 'GO',
    PYTHON = 'PYTHON',
    MERN = 'MERN',
    NEXTJS = 'NEXTJS',
    AI_GPT_APIS = 'AI_GPT_APIS',
    SPRINGBOOT = 'SPRINGBOOT',
    OTHERS = 'OTHERS',
}

export interface User {
    id: string;
    name: string;
    password?: string;
    avatar?: string;
    isVerified: boolean;
    role: Role;
    jobs?: Job[];
    email: string;
    emailVerified?: Date;
    skills: string[];
    experience?: Experience[];
    project?: Project[];
    resume?: string;
    oauthId?: string;
    createdAt: Date;
    blockedByAdmin?: Date;
    onBoard: boolean;
    bookmark?: Bookmark[];
    githubLink?: string;
    portfolioLink?: string;
    linkedinLink?: string;
    twitterLink?: string;
    discordLink?: string;
    contactEmail?: string;
    aboutMe?: string;
    education?: Education[];
    resumeUpdateDate?: Date;
    companyId?: string;
    company?: Company;
}

export interface Company {
    id: string;
    companyName: string;
    companyLogo?: string;
    companyEmail: string;
    companyBio: string;
    user?: User;
}

export interface Job {
    id: string;
    userId: string;
    title: string;
    description?: string;
    companyName: string;
    companyBio: string;
    companyEmail: string;
    category: string;
    type: EmploymentType;
    workMode: WorkMode;
    currency: Currency;
    city: string;
    address: string;
    application: string;
    companyLogo: string;
    skills: string[];
    expired: boolean;
    hasExpiryDate: boolean;
    expiryDate?: Date;
    hasSalaryRange: boolean;
    minSalary?: number;
    maxSalary?: number;
    hasExperiencerange: boolean;
    minExperience?: number;
    maxExperience?: number;
    isVerifiedJob: boolean;
    deleted: boolean;
    deletedAt?: Date;
    postedAt: Date;
    updatedAt: Date;
    user: User;
    bookmark?: Bookmark[];
}

export interface Bookmark {
    id: string;
    jobId: string;
    userId: string;
    job: Job;
    user: User;
}

export interface Experience {
    id: number;
    companyName: string;
    designation: string;
    EmploymentType: EmploymentType;
    address: string;
    workMode: WorkMode;
    currentWorkStatus: boolean;
    startDate: Date;
    endDate?: Date;
    description: string;
    userId: string;
    user: User;
}

export interface Education {
    id: number;
    instituteName: string;
    degree: DegreeType;
    fieldOfStudy: FieldOfStudyType;
    startDate: Date;
    endDate?: Date;
    userId: string;
    user: User;
}

export interface Project {
    id: number;
    projectName: string;
    projectThumbnail?: string;
    projectSummary: string;
    projectLiveLink?: string;
    projectGithub: string;
    stack: ProjectStack;
    userId: string;
    user: User;
    isFeature: boolean;
}
