export interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    jobType: 'full-time' | 'part-time' | 'contract' | 'freelance';
    experience: 'entry' | 'mid' | 'senior' | 'executive';
    industry: 'tech' | 'finance' | 'healthcare' | 'education' | 'marketing';
    description: string;
    requirements: string[];
    skills: string[];
    postedDate: string;
}

export const dummyJobs: Job[] = [
    {
        _id: '1',
        title: 'Senior Software Engineer',
        company: 'TechInnovate Solutions',
        location: 'San Francisco, CA',
        salary: 145000,
        jobType: 'full-time',
        experience: 'senior',
        industry: 'tech',
        description:
            'We are seeking an experienced software engineer to lead our frontend development team and drive innovative web solutions.',
        requirements: [
            '5+ years of React experience',
            'Deep understanding of modern JavaScript',
            'Experience with state management libraries',
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
        postedDate: '2024-03-15',
    },
    {
        _id: '2',
        title: 'Financial Analyst',
        company: 'Global Finance Corp',
        location: 'New York, NY',
        salary: 85000,
        jobType: 'full-time',
        experience: 'mid',
        industry: 'finance',
        description:
            'Seeking a detail-oriented financial analyst to support our investment research team.',
        requirements: [
            "Bachelor's degree in Finance",
            'Proficiency in financial modeling',
            'Advanced Excel skills',
        ],
        skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'PowerBI'],
        postedDate: '2024-03-20',
    },
    {
        _id: '3',
        title: 'Entry Level Marketing Coordinator',
        company: 'Creative Brands Inc.',
        location: 'Chicago, IL',
        salary: 52000,
        jobType: 'full-time',
        experience: 'entry',
        industry: 'marketing',
        description:
            'Exciting opportunity for a motivated marketing professional to join our dynamic team.',
        requirements: [
            "Bachelor's degree in Marketing",
            'Strong communication skills',
            'Basic understanding of social media marketing',
        ],
        skills: ['Social Media', 'Content Creation', 'Google Analytics'],
        postedDate: '2024-03-18',
    },
    {
        _id: '4',
        title: 'Healthcare Data Scientist',
        company: 'MedTech Innovations',
        location: 'Boston, MA',
        salary: 130000,
        jobType: 'full-time',
        experience: 'senior',
        industry: 'healthcare',
        description:
            'Lead our data science team in developing predictive models for patient care optimization.',
        requirements: [
            'PhD in Data Science or related field',
            'Experience in healthcare analytics',
            'Proficiency in machine learning techniques',
        ],
        skills: ['Python', 'Machine Learning', 'R', 'Statistical Analysis'],
        postedDate: '2024-03-22',
    },
    {
        _id: '5',
        title: 'Part-Time Education Content Creator',
        company: 'LearnSmart Platform',
        location: 'Remote',
        salary: 35000,
        jobType: 'part-time',
        experience: 'mid',
        industry: 'education',
        description:
            'Create engaging educational content for our online learning platform.',
        requirements: [
            'Teaching experience preferred',
            'Strong writing skills',
            'Creative approach to education',
        ],
        skills: ['Content Writing', 'Instructional Design', 'E-learning'],
        postedDate: '2024-03-17',
    },
    {
        _id: '6',
        title: 'Executive Product Manager',
        company: 'InnovateTech',
        location: 'Seattle, WA',
        salary: 220000,
        jobType: 'full-time',
        experience: 'executive',
        industry: 'tech',
        description:
            'Lead product strategy for our cutting-edge AI development team.',
        requirements: [
            '10+ years of product management experience',
            'Proven track record of successful product launches',
            'Strategic thinking and leadership skills',
        ],
        skills: [
            'Product Strategy',
            'AI/ML',
            'Leadership',
            'Innovation Management',
        ],
        postedDate: '2024-03-21',
    },
    {
        _id: '7',
        title: 'Contract UI/UX Designer',
        company: 'DesignWorks Studio',
        location: 'Los Angeles, CA',
        salary: 95000,
        jobType: 'contract',
        experience: 'mid',
        industry: 'tech',
        description:
            'Create intuitive and beautiful user interfaces for various digital products.',
        requirements: [
            'Strong portfolio of design work',
            'Proficiency in Figma and Adobe Creative Suite',
            'Understanding of user-centered design principles',
        ],
        skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
        postedDate: '2024-03-16',
    },
    {
        _id: '8',
        title: 'Freelance Content Marketing Specialist',
        company: 'Digital Growth Agency',
        location: 'Remote',
        salary: 65000,
        jobType: 'freelance',
        experience: 'mid',
        industry: 'marketing',
        description:
            'Create compelling content strategies for our diverse client base.',
        requirements: [
            'Proven content marketing experience',
            'Strong writing and editing skills',
            'Understanding of SEO best practices',
        ],
        skills: ['Content Marketing', 'SEO', 'Copywriting', 'Strategy'],
        postedDate: '2024-03-19',
    },
];
