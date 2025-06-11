import ProfileAboutMe from '@/components/profile/AboutMe';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileHeroSection from '@/components/profile/ProfileHeroSection';
import ProfileHireme from '@/components/profile/ProfileHireme';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ProfileResume from '@/components/profile/ProfileResume';
import ProfileSkills from '@/components/profile/ProfileSkills';
import { useApplicantStore } from '@/hooks/zustand/store/useApplicantStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      { company: 'Company B', role: 'Senior Developer', duration: '3 years' },
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
  const { getApplicantInfo, Applicant } = useApplicantStore();
  useEffect(() => {
    if (username) {
      getApplicantInfo(username);
    }
  }, [username]);

  const isOwner = true;

  return (
    <div className="mx-auto max-w-6xl py-5">
      <ProfileHeroSection applicant={Applicant} />
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
      <ProfileHireme applicant={Applicant} />
    </div>
  );
};

export default NewProfile;
