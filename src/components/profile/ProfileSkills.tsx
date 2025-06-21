'use client';
import { Info, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constants/Profile.constant';
import { SkillsForm } from './forms/SkillsForm';
import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';

const mockSkills = [
    'React',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'AWS',
    'Docker',
    'JavaScript',
    'Python',
    'Git',
];

const ProfileSkills = () => {
    const [skills, setSkills] = useState<string[]>(mockSkills);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const isOwner = true;
    const handleClose = () => {
        setIsSheetOpen(false);
    };

    const handleOpen = () => {
        setIsSheetOpen(true);
    };

    const addSkill = (newSkill: string) => {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills((prevSkills) =>
            prevSkills.filter((skill) => skill !== skillToRemove)
        );
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between space-y-3">
                <h3 className="text-2xl font-bold">Skills</h3>
                {isOwner && (
                    <Button
                        variant={'outline'}
                        className="flex gap-2 rounded-sm px-3 py-2 text-slate-500 dark:text-slate-400"
                        onClick={handleOpen}
                    >
                        <Pencil height={16} width={16} /> Update
                    </Button>
                )}
            </div>

            {skills.length === 0 && (
                <ProfileEmptyContainers
                    isOwner={isOwner}
                    buttonText="Add your skills"
                    handleClick={handleOpen}
                    title={
                        isOwner
                            ? ' You haven’t added any skills yet'
                            : 'No Skills added.'
                    }
                    description={
                        isOwner
                            ? 'Highlight your skills to stand out to potential employers.'
                            : ''
                    }
                    Icon={Info}
                />
            )}
            {skills.length !== 0 && (
                <div className="flex flex-wrap gap-x-2 rounded-2xl bg-slate-200 p-6 dark:bg-slate-900">
                    {skills.map((title) => {
                        return (
                            <div
                                key={title}
                                className="flex items-center gap-2 rounded-[8px] border border-slate-200 px-3 py-2 dark:border-slate-800 dark:text-slate-50"
                            >
                                {title}
                                {isOwner && (
                                    <button
                                        onClick={() => removeSkill(title)}
                                        className="ml-2 text-red-500"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {isOwner && (
                <SheetWrapper
                    isOpen={isSheetOpen}
                    handleClose={handleClose}
                    title={SHEETS.skills.title}
                    description={SHEETS.skills.description}
                >
                    <SkillsForm handleClose={handleClose} skills={skills} />
                </SheetWrapper>
            )}
        </div>
    );
};

export default ProfileSkills;
