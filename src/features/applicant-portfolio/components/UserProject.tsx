import { useState } from 'react';
import { Project } from '@/features/applicant-portfolio/lib/enum/enums';
import icons from '@/lib/icons';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../../shared/components/ui/card';
import { SquareArrowOutUpRightIcon } from 'lucide-react';

export function UserProjects() {
    const [projects, setProjects] = useState<Project[]>();

    if (!projects) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <icons.loading className="h-10 w-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="mt-4 grid grid-cols-4 gap-3">
            {projects.map((item: Project) => (
                <Card
                    key={item.id}
                    className="col-span-4 flex flex-col border-2 text-black transition-shadow duration-300 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900 md:col-span-2"
                >
                    <div className="mt-1 flex aspect-video h-[200px] w-full items-center justify-center overflow-hidden rounded-2xl object-contain p-1">
                        {item.projectThumbnail ? (
                            <img
                                alt={item.projectName}
                                src={item.projectThumbnail}
                                className={`h-[200px] transition-transform duration-300 hover:scale-110`}
                            />
                        ) : (
                            <div className="flex h-[200px] items-center justify-center rounded-2xl bg-slate-400 dark:bg-slate-900">
                                <span className="text-3xl font-semibold">
                                    {item.projectName}
                                </span>
                            </div>
                        )}
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-lg font-semibold uppercase">
                            {item.projectName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-start">
                        <p className="mb-4">{item.projectSummary}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {item.stack && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold">
                                    Stack:
                                </span>
                                <span className="text-xs">{item.stack}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-4">
                            {item.projectLiveLink && (
                                <Link
                                    to={item.projectLiveLink}
                                    className="text-blue-500 hover:underline"
                                >
                                    <SquareArrowOutUpRightIcon size={16} />
                                </Link>
                            )}
                            <Link
                                to={item.projectGithub}
                                className="text-blue-500 hover:underline"
                            >
                                <icons.github />
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            ))}
            {projects.length === 0 && (
                <div className="col-span-4 flex h-full items-center justify-center">
                    <icons.alert size={24} />
                    <span className="ml-2">No Projects Found</span>
                </div>
            )}
        </div>
    );
}
