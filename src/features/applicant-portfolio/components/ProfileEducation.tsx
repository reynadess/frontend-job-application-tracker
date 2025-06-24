import { Circle, BookOpenCheck, Plus, Pencil } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import SheetWrapper from '../../../shared/components/sheets/SheetWrapper';
import { SHEETS } from '@/features/applicant-portfolio/lib/constants/Profile.constant';
import EducationForm from './forms/EducationForm';
import { EducationType } from '@/shared/types/user.types';
import { DegreeType, FieldOfStudyType } from '@/features/applicant-portfolio/lib/enum/enums';

const mockEducation: EducationType[] = [
    {
        id: 1,
        degree: DegreeType.BTECH,
        instituteName: 'ABC University',
        fieldOfStudy: FieldOfStudyType.CS,
        startDate: new Date('2020-09-01'),
        endDate: new Date('2024-05-31'),
    },
    {
        id: 2,
        degree: DegreeType.BTECH,
        instituteName: 'XYZ Institute',
        fieldOfStudy: FieldOfStudyType.MACHINE_LEARNING,
        startDate: new Date('2020-09-01'),
        endDate: new Date('2024-05-31'),
    },
];

const ProfileEducation = () => {
    const isOwner = true;
    const [selectedEducation, setSelectedEducation] =
        useState<EducationType | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsSheetOpen(true);
    };
    const handleClose = () => {
        setIsSheetOpen(false);
        setSelectedEducation(null);
    };
    const handleEditClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        education: EducationType
    ) => {
        event.preventDefault();
        setSelectedEducation(education);
        setIsSheetOpen(true);
    };
    const title = selectedEducation
        ? SHEETS.education.title.replace('Add', 'Edit')
        : SHEETS.education.title;

    return (
        <div className="space-y-3">
            <div className="mb-6 flex items-center justify-between space-y-5">
                <h3 className="text-2xl font-bold">Education</h3>
                {isOwner && (
                    <Button
                        onClick={handleOpen}
                        variant="outline"
                        className="flex gap-2 rounded-md px-3 py-2 text-slate-500"
                    >
                        <Plus height={16} width={16} /> Add Education
                    </Button>
                )}
            </div>

            {mockEducation.length === 0 ? (
                <div className="text-center text-slate-500">
                    <BookOpenCheck size={48} className="mx-auto mb-4" />
                    <p>No Education added yet.</p>
                    {isOwner && <Button>Add your education</Button>}
                </div>
            ) : (
                mockEducation.map((edu) => (
                    <div
                        key={edu.id}
                        className="mb-4 rounded-2xl bg-slate-200 p-6 dark:bg-slate-900"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative flex w-4 justify-center">
                                <div className="absolute top-0 h-2 w-2 rounded-full bg-[#3259E8]"></div>
                                <div className="h-full w-[2px] bg-gradient-to-b from-[#3259e8] to-[#F1F5F9] dark:to-[#0F172A]"></div>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-bold dark:text-slate-50">
                                    {edu.degree}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {edu.instituteName}
                                    <Circle className="mx-2 inline" size={5} />
                                    {edu.fieldOfStudy}
                                </p>
                                <p className="text-sm text-slate-500">{`${edu.startDate} - ${edu.endDate}`}</p>
                            </div>

                            {isOwner && (
                                <Button
                                    onClick={(e) => handleEditClick(e, edu)}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <Pencil
                                        className="text-slate-500"
                                        size={16}
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                ))
            )}
            {isOwner && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleClose}
                    title={title}
                    description={SHEETS.education.description}
                >
                    <EducationForm
                        handleClose={handleClose}
                        selectedEducation={selectedEducation}
                    />
                </SheetWrapper>
            )}
        </div>
    );
};

export default ProfileEducation;
