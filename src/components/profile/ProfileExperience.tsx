import { Circle, Building2, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';
import ExperienceForm from './forms/ExperienceForm';
import { ExperienceType } from '@/types/user.types';
import { format } from 'date-fns';
import { ExperienceDeleteDialog } from './ExperienceDeleteDialog';
import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';
import { EmploymentType, WorkMode } from '@/lib/enum/enums';

const mockExperiences: ExperienceType[] = [
    {
        id: 1,
        designation: 'Senior Frontend Developer',
        companyName: 'Tech Corp',
        EmploymentType: EmploymentType.FULL_TIME,
        workMode: WorkMode.REMOTE,
        startDate: new Date('2021-01-01'),
        endDate: null,
        description: 'Leading frontend development team and architecture',
        currentWorkStatus: true,
        address: 'San Francisco, CA',
    },
    // Add more mock experiences as needed
];

const ProfileExperience = () => {
    const isOwner = true;
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [selecetedExperience, setSelecetedExperience] =
        useState<ExperienceType | null>(null);

    const [experiences] = useState(mockExperiences);

    const handleEditClick = (experience: ExperienceType) => {
        setSelecetedExperience(experience);
        handleOpen();
    };

    const handleClose = () => {
        setIsSheetOpen(false);
    };
    const handleOpen = () => {
        setIsSheetOpen(true);
    };
    function formatDateRange(startDate: Date, endDate: Date | null): string {
        const startFormatted = format(startDate, 'MMMM yy');
        const endFormatted = endDate ? format(endDate, 'MMMM yy') : 'Present';

        return `${startFormatted} - ${endFormatted}`;
    }

    const title = selecetedExperience
        ? SHEETS.expierence.title.replace('Add', 'Edit')
        : SHEETS.expierence.title;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h3 className="text-2xl font-bold">Work Experience</h3>
                {isOwner && (
                    <Button
                        variant={'outline'}
                        className="flex gap-2 rounded-sm px-3 py-2 text-slate-500 dark:text-slate-400"
                        onClick={handleOpen}
                    >
                        <Plus height={16} width={16} /> Add Experience
                    </Button>
                )}
            </div>

            {experiences.length === 0 && (
                <ProfileEmptyContainers
                    isOwner={isOwner}
                    buttonText=" Add your work experience"
                    handleClick={handleOpen}
                    title={
                        isOwner
                            ? 'You haven’t added work experience yet'
                            : 'No Work Experience added.'
                    }
                    description={
                        isOwner
                            ? 'Share your experience to attract the right companies.'
                            : ''
                    }
                    Icon={Building2}
                />
            )}

            {experiences.length !== 0 && (
                <div className="rounded-2xl bg-slate-200 p-6 dark:bg-slate-900">
                    {experiences.map((experience) => (
                        <div key={experience.id} className="flex flex-col">
                            <div className="flex justify-start gap-3">
                                <div className="relative flex w-4 justify-center">
                                    <div className="absolute top-0 h-2 w-2 rounded-full bg-[#3259E8]"></div>
                                    <div className="h-full w-[2px] bg-gradient-to-b from-[#3259e8] to-[#F1F5F9] dark:to-[#0F172A]"></div>
                                </div>
                                <div className="mb-3 flex w-full flex-col gap-2">
                                    <div className="flex flex-col justify-between sm:flex-row">
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-xl font-bold text-[#020817] dark:text-slate-50">
                                                {experience.designation}
                                            </h2>
                                            <p className="flex items-center gap-[4px] text-sm font-medium text-slate-500 dark:text-slate-400">
                                                <span className="text-sm font-medium text-[#3259E8]">
                                                    {experience.companyName}
                                                </span>
                                                <Circle
                                                    width={5}
                                                    height={5}
                                                    fill="currentColor"
                                                />
                                                {experience.EmploymentType}
                                                <Circle
                                                    width={5}
                                                    height={5}
                                                    fill="currentColor"
                                                />
                                                {experience.workMode}
                                            </p>
                                            <div className="w-fit rounded-[8px] bg-slate-500 bg-opacity-10 px-3 py-1 text-sm text-slate-500 dark:text-slate-400">
                                                {formatDateRange(
                                                    experience.startDate,
                                                    experience.endDate
                                                )}
                                            </div>
                                        </div>
                                        {isOwner && (
                                            <div className="flex w-fit items-center gap-3">
                                                <ExperienceDeleteDialog />
                                                <Button
                                                    className="b-0 bg-transparent p-0 hover:bg-transparent"
                                                    onClick={() =>
                                                        handleEditClick(
                                                            experience
                                                        )
                                                    }
                                                >
                                                    <Pencil
                                                        width={16}
                                                        height={16}
                                                        className="text-slate-500 dark:text-slate-400"
                                                    />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-base font-medium text-[#020817] dark:text-slate-50">
                                        {experience.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isOwner && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleClose}
                    title={title}
                    description={SHEETS.expierence.description}
                >
                    <ExperienceForm
                        handleClose={handleClose}
                        selecetedExperience={selecetedExperience}
                    />
                </SheetWrapper>
            )}
        </div>
    );
};

export default ProfileExperience;
