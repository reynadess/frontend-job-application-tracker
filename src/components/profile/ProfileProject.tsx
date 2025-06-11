import { ProjectDeleteDialog } from './projectDeleteDialog';
import { Button } from '../ui/button';
import { ArrowUpRight, Github, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectType } from '@/types/user.types';

const ProfileProject = ({
  project,
  handleClick,
}: {
  project: ProjectType;
  handleClick: (project: ProjectType) => void;
}) => {
  const isOwner = true; // Static placeholder for ownership check

  return (
    <div className="flex flex-col gap-y-6 rounded-2xl bg-slate-200 p-3 dark:bg-slate-900 sm:p-6">
      <div className="aspect-w-16 relative h-48 w-full overflow-hidden rounded-[8px]">
        <img
          //FIXME : placeholder and proper image
          src={
            project.projectThumbnail ||
            'https://https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png.png'
          } // Static placeholder image
          alt="project-image"
          className="object-cover"
          sizes="16:9"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <h2 className="truncate text-xl font-bold"> {project.projectName}</h2>
          {isOwner && (
            <div className="flex w-fit items-center gap-3">
              <ProjectDeleteDialog />
              <Button
                onClick={() => handleClick(project)}
                className="b-0 bg-transparent p-0 hover:bg-transparent"
              >
                <Pencil
                  width={16}
                  height={16}
                  className="text-slate-500 dark:text-slate-400"
                />
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">
          {project.projectSummary}
        </p>
        <div className="w-fit rounded-[8px] bg-slate-500 bg-opacity-10 px-3 py-1 text-sm text-slate-500 dark:text-slate-400">
          {project.stack}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          target="_blank"
          to="https://example.com"
          className="flex w-fit items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-base text-slate-500 dark:border-slate-800 dark:bg-[#020817] dark:text-slate-400"
        >
          View Project <ArrowUpRight height={16} width={16} />
        </Link>
        <Link
          target="_blank"
          to="https://github.com/example"
          className="flex w-fit items-center gap-2 rounded-[8px] border-none px-3 py-2 text-base text-slate-500 dark:text-slate-400"
        >
          <Github
            height={16}
            width={16}
            className="fill-slate-500 dark:fill-slate-400"
          />{' '}
          View
        </Link>
      </div>
    </div>
  );
};

export default ProfileProject;
