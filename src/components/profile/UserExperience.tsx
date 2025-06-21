import { useState } from 'react';
import icons from '@/lib/icons';
import _ from 'lodash';

const mockExperiences = [
    {
        id: 1,
        companyName: 'Tech Corp',
        designation: 'Senior Developer',
        startDate: new Date('2022-01-01'),
        endDate: null,
        description: 'Leading frontend development team',
        EmploymentType: 'Full-time',
        workMode: 'Remote',
    },
    {
        id: 2,
        companyName: 'StartUp Inc',
        designation: 'Junior Developer',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2021-12-31'),
        description: 'Full stack development',
        EmploymentType: 'Part-time',
        workMode: 'Hybrid',
    },
];

export function UserExperience() {
    const [experiences] = useState(mockExperiences);

    if (!experiences) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <icons.loading className="h-10 w-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="mb-2 space-y-2">
            {experiences.map((item) => (
                <div
                    key={item.id}
                    className="col-span-4 flex flex-col items-center justify-between gap-2 rounded-2xl border-2 p-3 text-black transition-shadow duration-300 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900 md:col-span-2"
                >
                    <div className="flex w-full items-center justify-between py-2">
                        <div className="flex w-1/3 flex-col items-start justify-center">
                            <div className="font-semibold">
                                {new Date(item.startDate).toLocaleDateString()}
                                {item.endDate
                                    ? ` - ${new Date(item.endDate).toLocaleDateString()}`
                                    : ' - Present'}
                            </div>
                            <div className="text-slate-700 dark:text-slate-400">
                                {_.startCase(item.EmploymentType)},{' '}
                                {_.startCase(item.workMode)}
                            </div>
                        </div>
                        <div className="flex w-1/3 flex-col items-start justify-center gap-1">
                            <span className="font-bold">
                                {item.companyName}
                            </span>
                            <p className="text-slate-700 dark:text-slate-400">
                                {item.designation}
                            </p>
                        </div>
                    </div>
                    <div className="w-full border-l-4 bg-slate-900/50 p-2">
                        <span className="text-slate-700 dark:text-slate-400">
                            {item.description}
                        </span>
                    </div>
                </div>
            ))}
            {experiences.length === 0 && (
                <div className="col-span-4 flex h-full items-center justify-center">
                    <icons.alert size={24} />
                    <span className="ml-2">No Experiences Found</span>
                </div>
            )}
        </div>
    );
}
