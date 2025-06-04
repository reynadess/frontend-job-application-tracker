import { UserType } from '@/types/user.types';
import { Globe } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const ProfileSocials = ({ userdetails , applicant }: { userdetails: any ,applicant : UserType }) => {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-3">
      {userdetails.githubLink && (
        <Link
          target="_blank"
          to={userdetails.githubLink}
          className="px-3 dark:text-slate-50 flex gap-1 items-center w-fit py-2 text-base dark:bg-slate-900 bg-slate-100 rounded-[8px] "
        >
          <Icon
            icon={'github'}
            className="w-6 h-6 dark:text-slate-400 text-slate-500"
          />
          {userdetails.githubLink.split('/').filter(Boolean).pop()}
        </Link>
      )}
      {userdetails.linkedinLink && (
        <Link
          target="_blank"
          to={userdetails.linkedinLink}
          className="px-3 dark:text-slate-50 flex gap-1 items-center w-fit py-2 text-base dark:bg-slate-900 bg-slate-100 rounded-[8px] "
        >
          <Icon
            icon={'linkedin'}
            className="w-6 h-6 dark:text-slate-400 text-slate-500"
          />
          {userdetails.linkedinLink.split('/').filter(Boolean).pop()}
        </Link>
      )}
      {userdetails.twitterLink && (
        <Link
          target="_blank"
          to={userdetails.twitterLink}
          className="px-3 dark:text-slate-50 flex gap-1 items-center w-fit py-2 text-base dark:bg-slate-900 bg-slate-100 rounded-[8px] "
        >
          <Icon
            icon={'twitter'}
            className="w-6 h-6 dark:text-slate-400 text-slate-500"
          />
          {userdetails.twitterLink.split('/').filter(Boolean).pop()}
        </Link>
      )}
      {userdetails.discordLink && (
        <Link
          target="_blank"
          to={userdetails.discordLink}
          className="px-3 dark:text-slate-50 flex gap-1 items-center w-fit py-2 text-base dark:bg-slate-900 bg-slate-100 rounded-[8px] "
        >
          <Icon
            icon={'discord'}
            className="w-6 h-6 dark:text-slate-400 text-slate-500"
          />
          {userdetails.discordLink.split('/').filter(Boolean).pop()}
        </Link>
      )}

      {userdetails.portfolioLink && (
        <Link
          target="_blank"
          to={userdetails.portfolioLink}
          className="px-3 dark:text-slate-50 flex gap-1 items-center w-fit py-2 text-base dark:bg-slate-900 bg-slate-100 rounded-[8px] "
        >
          <Globe
            width={24}
            height={24}
            className="dark:text-slate-400 text-slate-500"
          />
          Portfolio
        </Link>
      )}
    </div>
  );
};

export default ProfileSocials;
