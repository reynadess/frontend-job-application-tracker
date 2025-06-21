import { UserType } from '@/types/user.types';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileHireme = ({ applicant }: { applicant: any }) => {
    return (
        <div className="mt-7 flex min-h-40 flex-col items-center justify-center gap-y-4 overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-200 to-slate-300 px-6 py-4 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
                <h4 className="text-xl font-bold">
                    Hire Me, Let’s Make Magic Happen!
                </h4>
                <p className="text-sm font-medium text-gray-500">
                    Searching for talent that can drive success? I’m ready to
                    contribute to your goals!
                </p>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Link
                    to={`mailto:${applicant.email}`}
                    className="flex gap-1 rounded-sm bg-[#3259E8] px-3 py-2 text-white hover:text-yellow-300"
                >
                    <Mail /> <p>Contact Me</p>
                </Link>
                <Link
                    to="/"
                    target="_blank"
                    className="flex gap-1 rounded-sm border-slate-200 bg-transparent bg-white px-3 py-2 text-slate-500 dark:bg-[#020817] dark:text-slate-400"
                >
                    View Resume
                    <ArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default ProfileHireme;
