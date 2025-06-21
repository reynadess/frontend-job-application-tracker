import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, FileStack, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileProject from './ProfileProject';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';
import ProjectForm from './forms/ProjectForm';

const mockProjects = [
    {
        id: 1,
        projectName: 'E-commerce Platform',
        projectSummary: 'A full-stack e-commerce solution',
        projectThumbnail:
            'https://media.geeksforgeeks.org/wp-content/uploads/20240909102345/Web-Design-Projects-1.webp',
        stack: 'React, Node.js, MongoDB',
        projectLiveLink: 'https://example.com',
        projectGithub: 'https://github.com/example',
        isFeature: true,
    },
    {
        id: 2,
        projectName: 'Task Manager',
        projectSummary: 'A task management application',
        projectThumbnail:
            'https://media.geeksforgeeks.org/wp-content/uploads/20240909102345/Web-Design-Projects-1.webp',
        stack: 'Vue.js, Express, PostgreSQL',
        projectLiveLink: 'https://example2.com',
        projectGithub: 'https://github.com/example2',
        isFeature: false,
    },
];

const ProfileProjects = ({ isOwner = true }) => {
    const [projects, setProjects] = useState(mockProjects);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isSeeMore, setIsSeeMore] = useState(false);

    const handleOpen = () => setIsSheetOpen(true);
    const handleClose = () => setIsSheetOpen(false);
    const handleSeeMore = () => setIsSeeMore(!isSeeMore);
    const handleEditClick = () => {
        setProjects(mockProjects);
        handleOpen();
    };
    const allProjects = useMemo(() => {
        return projects
            .filter((project) => (isSeeMore ? true : project.isFeature))
            .sort((a, b) => Number(b.isFeature) - Number(a.isFeature));
    }, [isSeeMore]);

    return (
        <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between space-y-3">
                <h3 className="text-2xl font-bold">Projects</h3>
                {isOwner && (
                    <Button
                        variant={'outline'}
                        onClick={handleOpen}
                        className="flex gap-2 rounded-md px-4 py-2"
                    >
                        <Plus size={16} /> Add Project
                    </Button>
                )}
            </div>

            {projects.length === 0 ? (
                <div className="text-center text-slate-500">
                    <FileStack size={48} className="mx-auto mb-4" />
                    <p>No Projects Added Yet.</p>
                    {isOwner && (
                        <Button onClick={handleOpen}>Add Your Projects</Button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {allProjects.map((project) => (
                            <ProfileProject
                                key={project.id}
                                project={project}
                                handleClick={handleEditClick}
                            />
                        ))}
                    </div>
                    <Button
                        variant={'outline'}
                        onClick={handleSeeMore}
                        className="mt-6 rounded-md border px-4 py-2"
                    >
                        {isSeeMore ? 'Hide' : 'See More'}
                        {isSeeMore ? (
                            <ChevronUp size={16} />
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </Button>
                </>
            )}

            {isOwner && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleClose}
                    title={SHEETS.project.title}
                    description={SHEETS.project.description}
                >
                    <ProjectForm
                        handleClose={handleClose}
                        selectedProject={setProjects}
                    />
                </SheetWrapper>
            )}
        </div>
    );
};

export default ProfileProjects;
