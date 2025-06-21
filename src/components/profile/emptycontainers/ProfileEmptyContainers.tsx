import { Button } from '@/components/ui/button';
import React from 'react';

const ProfileEmptyContainers = ({
    title,
    isOwner,
    Icon,
    description,
    handleClick,
    buttonText,
}: {
    title: string;
    Icon: React.ElementType;
    description: string;
    handleClick: () => void;
    buttonText: string;
    isOwner: boolean;
}) => {
    return (
        <div className="flex h-80 flex-col items-center justify-center gap-y-4 overflow-hidden rounded-2xl border px-6">
            <Icon
                width={32}
                height={32}
                className="text-slate-500 dark:text-slate-400"
            />
            <div className="text-center">
                <h4 className="text-xl font-bold">{title}</h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>
            {isOwner && (
                <Button onClick={handleClick} className="rounded-sm text-white">
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

export default ProfileEmptyContainers;
