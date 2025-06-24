'use client';
import { SquareUserRound, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import SheetWrapper from '../../../shared/components/sheets/SheetWrapper';
import { SHEETS } from '@/features/applicant-portfolio/lib/constants/Profile.constant';
import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';
import AboutMeForm from './forms/ReadMeForm';

const ProfileAboutMe = ({
    aboutMe,
    isOwner,
}: {
    aboutMe: string;
    isOwner: boolean;
}) => {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const title =
        aboutMe.length === 0
            ? SHEETS.aboutMe.title
            : SHEETS.aboutMe.title.replace('Add', 'Edit');

    const handleClose = () => {
        setIsSheetOpen(false);
    };
    const handleOpen = () => {
        setIsSheetOpen(true);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between space-y-2">
                <h3 className="text-2xl font-bold">About Me</h3>
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
            {!aboutMe && (
                <ProfileEmptyContainers
                    isOwner={isOwner}
                    buttonText="Add About Me"
                    handleClick={handleOpen}
                    title={
                        isOwner
                            ? 'You haven’t added an about me yet'
                            : 'No About Me added.'
                    }
                    description={
                        isOwner
                            ? 'Share a brief introduction to let companies know who you are.'
                            : ''
                    }
                    Icon={SquareUserRound}
                />
            )}
            {aboutMe && (
                <div className="rounded-2xl bg-slate-200 p-6 dark:bg-slate-900">
                    <p className="text-base leading-normal">{aboutMe}</p>
                </div>
            )}
            {isOwner && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleClose}
                    title={title}
                    description={SHEETS.aboutMe.description}
                >
                    <AboutMeForm handleClose={handleClose} aboutMe={aboutMe} />
                </SheetWrapper>
            )}
        </div>
    );
};

export default ProfileAboutMe;
