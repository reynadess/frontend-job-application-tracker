import ProfileAboutMe from '@/features/applicant-portfolio/components/AboutMe';
import ProfileEducation from '@/features/applicant-portfolio/components/ProfileEducation';
import ProfileExperience from '@/features/applicant-portfolio/components/ProfileExperience';
import ProfileHeroSection from '@/features/applicant-portfolio/components/ProfileHeroSection';
import ProfileHireme from '@/features/applicant-portfolio/components/ProfileHireme';
import ProfileProjects from '@/features/applicant-portfolio/components/ProfileProjects';
import ProfileResume from '@/features/applicant-portfolio/components/ProfileResume';
import ProfileSkills from '@/features/applicant-portfolio/components/ProfileSkills';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApplicant } from '../hooks/useApplicant';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PAGE_TITLES } from '@/shared/utils/pageTitle';

const NewProfile = () => {
    const userDetails = {
        name: 'John Doe',
        aboutMe:
            'I am a software developer with a passion for building web applications.',
        resume: 'https://example.com/resume.pdf',
        resumeUpdateDate: new Date(),
        skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
        project: [
            {
                id: '1',
                projectName: 'Project 1',
                projectGithub: 'https://github.com/example/project1',
                projectThumbnail: 'https://example.com/project1-thumbnail.jpg',
                description: 'Description of project 1',
                technologies: ['React', 'TypeScript'],
                liveDemo: 'https://example.com/project1',
            },
            {
                id: '2',
                projectName: 'Project 2',
                projectGithub: 'https://github.com/example/project2',
                projectThumbnail: 'https://example.com/project2-thumbnail.jpg',
                description: 'Description of project 2',
                technologies: ['Node.js', 'Express'],
                liveDemo: 'https://example.com/project2',
            },
        ],
        experience: [
            { company: 'Company A', role: 'Developer', duration: '2 years' },
            {
                company: 'Company B',
                role: 'Senior Developer',
                duration: '3 years',
            },
        ],
        education: [
            {
                institution: 'University A',
                degree: 'B.Sc. in Computer Science',
                year: '2015',
            },
            {
                institution: 'University B',
                degree: 'M.Sc. in Software Engineering',
                year: '2018',
            },
        ],
        email: 'johndoe@example.com',
        contactEmail: 'contact@example.com',
    };
    const { username } = useParams();
    const { getApplicantInfo, Applicant } = useApplicant();
    useEffect(() => {
        if (username) {
            getApplicantInfo(username);
        }
    }, [username]);
    const isOwner = true;
    usePageTitle(
        Applicant
            ? `${PAGE_TITLES.PROFILE} | ${Applicant.username}`
            : PAGE_TITLES.PROFILE
    );

    return (
        <div className="mx-auto max-w-6xl py-5">
            {/*TODO: Pass the isOwner property after login done */}
            <ProfileHeroSection applicant={Applicant || undefined} />
            <ProfileAboutMe aboutMe={userDetails.aboutMe} isOwner={isOwner} />
            <ProfileResume
                resume={userDetails.resume}
                // name={userDetails.name}
                // resumeUpdateDate={userDetails.resumeUpdateDate}
            />
            <ProfileSkills />
            <ProfileProjects />
            <div className="mt-5">
                <ProfileExperience />
            </div>
            <ProfileEducation />
            <ProfileHireme applicant={Applicant || undefined} />
        </div>
    );
};

export default NewProfile;
