import { UserType } from '@/shared/types/user.types';
import { Globe } from 'lucide-react';
import Icon from '@/shared/components/ui/icon';
import { Link } from 'react-router-dom';

const ProfileSocials = ({
    userdetails,
    applicant,
}: {
    userdetails: any;
    applicant: UserType;
}) => {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-3">
            {userdetails.githubLink && (
                <Link
                    target="_blank"
                    to={userdetails.githubLink}
                    className="flex w-fit items-center gap-1 rounded-[8px] bg-slate-100 px-3 py-2 text-base dark:bg-slate-900 dark:text-slate-50"
                >
                    <Icon
                        icon={'github'}
                        className="h-6 w-6 text-slate-500 dark:text-slate-400"
                    />
                    {userdetails.githubLink.split('/').filter(Boolean).pop()}
                </Link>
            )}
            {userdetails.linkedinLink && (
                <Link
                    target="_blank"
                    to={userdetails.linkedinLink}
                    className="flex w-fit items-center gap-1 rounded-[8px] bg-slate-100 px-3 py-2 text-base dark:bg-slate-900 dark:text-slate-50"
                >
                    <Icon
                        icon={'linkedin'}
                        className="h-6 w-6 text-slate-500 dark:text-slate-400"
                    />
                    {userdetails.linkedinLink.split('/').filter(Boolean).pop()}
                </Link>
            )}
            {userdetails.twitterLink && (
                <Link
                    target="_blank"
                    to={userdetails.twitterLink}
                    className="flex w-fit items-center gap-1 rounded-[8px] bg-slate-100 px-3 py-2 text-base dark:bg-slate-900 dark:text-slate-50"
                >
                    <Icon
                        icon={'twitter'}
                        className="h-6 w-6 text-slate-500 dark:text-slate-400"
                    />
                    {userdetails.twitterLink.split('/').filter(Boolean).pop()}
                </Link>
            )}
            {userdetails.discordLink && (
                <Link
                    target="_blank"
                    to={userdetails.discordLink}
                    className="flex w-fit items-center gap-1 rounded-[8px] bg-slate-100 px-3 py-2 text-base dark:bg-slate-900 dark:text-slate-50"
                >
                    <Icon
                        icon={'discord'}
                        className="h-6 w-6 text-slate-500 dark:text-slate-400"
                    />
                    {userdetails.discordLink.split('/').filter(Boolean).pop()}
                </Link>
            )}

            {userdetails.portfolioLink && (
                <Link
                    target="_blank"
                    to={userdetails.portfolioLink}
                    className="flex w-fit items-center gap-1 rounded-[8px] bg-slate-100 px-3 py-2 text-base dark:bg-slate-900 dark:text-slate-50"
                >
                    <Globe
                        width={24}
                        height={24}
                        className="text-slate-500 dark:text-slate-400"
                    />
                    Portfolio
                </Link>
            )}
        </div>
    );
};

export default ProfileSocials;
