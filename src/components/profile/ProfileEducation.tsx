import { Circle, BookOpenCheck, Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';
import EducationForm from './forms/EducationForm';
import { EducationType } from '@/types/user.types';
import { DegreeType } from '@/lib/enum/enums';

const mockEducation = [
  {
    id :1,
    degree: DegreeType.BTECH,
    instituteName: 'ABC University',
    fieldOfStudy: 'Computer Science',
    startDate: 'September 2020',
    endDate: 'June 2024',
  },
  {
    id:2,
    degree: DegreeType.BTECH,
    instituteName: 'XYZ Institute',
    fieldOfStudy: 'Data Science',
    startDate: 'August 2024',
    endDate: 'Present',
  },
];

const ProfileEducation = () => {
  const isOwner = true; 
  const [selectedEducation, setSelectedEducation] = useState<EducationType | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsSheetOpen(true)
  };
  const handleClose = () => {
    setIsSheetOpen(false);
    setSelectedEducation(null);
  }
  const handleEditClick = (mockEducation: EducationType) => {
    setSelectedEducation(mockEducation);
    handleOpen();
  };
  const title = selectedEducation
  ? SHEETS.education.title.replace('Add', 'Edit')
  : SHEETS.education.title;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-6 space-y-5">
        <h3 className="font-bold text-2xl">Education</h3>
        {isOwner && (
          <Button
          onClick={handleOpen}
            variant="outline"
            className="px-3 py-2 rounded-md text-slate-500 flex gap-2"
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
            className="rounded-2xl p-6 bg-slate-200 dark:bg-slate-900 mb-4"
          >
            <div className="flex gap-4 items-start">
              <div className="relative w-4 flex justify-center">
                <div className="absolute top-0 w-2 h-2 rounded-full bg-[#3259E8]"></div>
                <div className="w-[2px] h-full bg-gradient-to-b from-[#3259e8] to-[#F1F5F9] dark:to-[#0F172A]"></div>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold dark:text-slate-50">{edu.degree}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {edu.instituteName}
                  <Circle className="inline mx-2" size={5} />
                  {edu.fieldOfStudy}
                </p>
                <p className="text-sm text-slate-500">{`${edu.startDate} - ${edu.endDate}`}</p>
              </div>

              {isOwner && (
                <Button onClick={handleEditClick} variant="ghost" size="icon">
                  <Pencil className="text-slate-500" size={16} />
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
