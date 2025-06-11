'use client';
import { FileText, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';
import UploadResumeForm from './forms/UploadResumeForm';
import { format } from 'date-fns';
import { ResumeDeleteDialog } from './resumeDeleteDialog';

import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';
import { Link } from 'react-router-dom';

const mockResumeData = {
  resume: 'https://example.com/resume.pdf',
  name: 'John Doe',
  resumeUpdateDate: new Date(),
};

const ProfileResume = ({ resume }) => {
  const [resumeData] = useState(mockResumeData);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isOwner] = useState<boolean>(true);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between space-y-2">
        <h3 className="text-2xl font-bold">Resume</h3>
        {isOwner && (
          <Button
            variant={'outline'}
            className="flex gap-2 rounded-sm px-3 py-2 text-slate-500 dark:text-slate-400"
            onClick={handleOpen}
          >
            <Pencil height={16} width={16} /> Edit
          </Button>
        )}
      </div>

      {resumeData.resume.length === 0 && (
        <ProfileEmptyContainers
          isOwner={isOwner}
          buttonText="Upload your resume"
          handleClick={handleOpen}
          title={
            isOwner ? 'You haven’t uploaded a resume yet' : 'No Resume added.'
          }
          description={
            isOwner
              ? 'Upload your resume to showcase your skills and experiences to recruiters.'
              : ''
          }
          Icon={FileText}
        />
      )}
      {resumeData.resume && (
        <div className="flex items-center justify-between gap-y-4 rounded-2xl bg-slate-200 p-6 dark:bg-slate-900">
          <Link to={resumeData.resume} target="_blank" className="flex gap-x-4">
            <div className="w-fit rounded-[12px] border border-slate-200 p-2 dark:border-slate-800">
              <FileText width={32} height={32} className="text-slate-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {' '}
                {resumeData.name.replace(' ', '_') + '_resume'}{' '}
              </h2>
              <p className="font-medium text-slate-500">
                {format(resumeData.resumeUpdateDate, 'dd MMM yyyy')}
              </p>
            </div>
          </Link>
          {isOwner && <ResumeDeleteDialog />}
        </div>
      )}
      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={SHEETS.resume.title}
          description={SHEETS.resume.description}
        >
          <UploadResumeForm handleClose={handleClose} />
        </SheetWrapper>
      )}
    </div>
  );
};

export default ProfileResume;
