export interface Company {
  logo?: string;
}

export interface JobProps {
  job: {
    _id: string;
    createdAt: string;
    company?: Company;
    name: string;
    title: string;
    description: string;
    position: number;
    jobType: string;
    salary: string;
  };
}

export const dummyJobs: JobProps["job"][] = [
  {
    _id: "1",
    createdAt: new Date().toISOString(),
    company: {
      logo: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj",
    },
    name: "Google",
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    position: 3,
    jobType: "Full-time",
    salary: "15",
  },
  {
    _id: "2",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 3)
    ).toISOString(),
    company: {
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_kXVj3MGEZAiw5LFOtWMYpl9EHk45elb6SpEWfIigi3_3M=s900-c-k-c0x00ffffff-no-rj",
    },
    name: "Microsoft",
    title: "Backend Engineer",
    description:
      "We are seeking a backend engineer with experience in Node.js and databases.",
    position: 2,
    jobType: "Part-time",
    salary: "12",
  },
  {
    _id: "3",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 10)
    ).toISOString(),
    company: {
      logo: "https://media.wired.com/photos/5a99ba72927dc94e67685b9b/1:1/w_700,h_700,c_limit/amazon-a-logo.jpg",
    },
    name: "Amazon",
    title: "Full Stack Developer",
    description: "Join our team to work on scalable full-stack applications.",
    position: 5,
    jobType: "Internship",
    salary: "8",
  },
  {
    _id: "4",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 20)
    ).toISOString(),
    company: {
      logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGMva5_E8pUjw/company-logo_200_200/company-logo_200_200/0/1736276678240/netflix_logo?e=2147483647&v=beta&t=-84GbYZIgL-lNtKMkXAk-OE1L6VJVMfBSLJRG8FLkVY",
    },
    name: "Netflix",
    title: "UI/UX Designer",
    description:
      "Design stunning user experiences for millions of users worldwide.",
    position: 1,
    jobType: "Contract",
    salary: "10",
  },
];
