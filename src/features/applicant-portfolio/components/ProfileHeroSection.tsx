'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Pencil, Settings, User } from 'lucide-react';
import SheetWrapper from '../../../shared/components/sheets/SheetWrapper';
import EditProfileForm from './forms/EditProfileForm';
import { SHEETS } from '@/features/applicant-portfolio/lib/constants/Profile.constant';
import AccountSeetingForm from './forms/AccountSeetingForm';
import ProfileSocials from './ProfileSocials';
import { ProfileShareDialog } from './ProfileShare';

const mockUserDetails = {
    id: '1',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://github.com/shadcn.png',
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    twitterLink: 'https://twitter.com/johndoe',
    portfolioLink: 'https://johndoe.dev',
    discordLink: 'https://discord.com/users/johndoe',
    email: 'john@example.com',
    contactEmail: 'contact@example.com',
    skills: [],
};

const ProfileHeroSection = ({ applicant }: { applicant: any }) => {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
    const [userdetails] = useState(mockUserDetails);

    const handleClose = () => {
        setIsSheetOpen(false);
        setIsAccountOpen(false);
    };

    const handleOpen = () => {
        setIsSheetOpen(true);
    };

    return (
        <>
            <div className="min-h-72 overflow-hidden rounded-2xl border">
                <div className="h-32 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="relative flex flex-col gap-y-3 p-6">
                    <Avatar className="absolute -top-16 h-32 w-32 bg-slate-100 dark:bg-slate-900">
                        {userdetails.avatar && (
                            <AvatarImage
                                src={userdetails.avatar}
                                alt="@shadcn"
                            />
                        )}
                        <AvatarFallback>
                            <User
                                width={32}
                                height={32}
                                className="text-slate-500 dark:text-slate-400"
                            />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex h-10 w-full justify-end gap-2">
                        <Button
                            variant={'outline'}
                            className="rounded-sm px-3 py-2"
                            onClick={handleOpen}
                        >
                            <Pencil height={16} width={16} />
                        </Button>
                        <Button
                            onClick={() => setIsAccountOpen(true)}
                            variant={'outline'}
                            className="rounded-sm px-3 py-2"
                        >
                            <Settings height={16} width={16} />
                        </Button>
                        <ProfileShareDialog />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">
                            {`${applicant.firstName}\t${applicant.lastName}`}{' '}
                        </h2>
                    </div>
                    <ProfileSocials
                        userdetails={userdetails}
                        applicant={applicant}
                    />
                </div>
            </div>
            <SheetWrapper
                isOpen={isSheetOpen}
                handleClose={handleClose}
                title={SHEETS.editProfile.title}
                description={SHEETS.editProfile.description}
            >
                <EditProfileForm
                    userDetails={userdetails}
                    onClose={handleClose}
                />
            </SheetWrapper>
            <SheetWrapper
                isOpen={isAccountOpen}
                handleClose={handleClose}
                title={SHEETS.accountSetting.title}
                description={SHEETS.accountSetting.description}
            >
                <AccountSeetingForm handleClose={handleClose} />
            </SheetWrapper>
        </>
    );
};

export default ProfileHeroSection;
