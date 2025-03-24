import { useState } from 'react';
import icons from '@/lib/icons';
import _ from 'lodash';

const mockExperiences = [
  {
    id: 1,
    companyName: "Tech Corp",
    designation: "Senior Developer",
    startDate: new Date("2022-01-01"),
    endDate: null,
    description: "Leading frontend development team",
    EmploymentType: "Full-time",
    workMode: "Remote"
  },
  {
    id: 2,
    companyName: "StartUp Inc",
    designation: "Junior Developer",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2021-12-31"),
    description: "Full stack development",
    EmploymentType: "Part-time",
    workMode: "Hybrid"
  }
];

export function UserExperience() {
  const [experiences] = useState(mockExperiences);

  if (!experiences) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <icons.loading className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-2">
      {experiences.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-between md:col-span-2 col-span-4 border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300 p-3 gap-2 rounded-2xl"
        >
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex flex-col justify-center items-start w-1/3">
              <div className="font-semibold">
                {new Date(item.startDate).toLocaleDateString()}
                {item.endDate
                  ? ` - ${new Date(item.endDate).toLocaleDateString()}`
                  : ' - Present'}
              </div>
              <div className="dark:text-slate-400 text-slate-700">
                {_.startCase(item.EmploymentType)}, {_.startCase(item.workMode)}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-1/3 gap-1">
              <span className="font-bold">{item.companyName}</span>
              <p className="dark:text-slate-400 text-slate-700">
                {item.designation}
              </p>
            </div>
          </div>
          <div className="w-full border-l-4 p-2 bg-slate-900/50">
            <span className="dark:text-slate-400 text-slate-700">
              {item.description}
            </span>
          </div>
        </div>
      ))}
      {experiences.length === 0 && (
        <div className="flex items-center justify-center col-span-4 h-full">
          <icons.alert size={24} />
          <span className="ml-2">No Experiences Found</span>
        </div>
      )}
    </div>
  );
}
