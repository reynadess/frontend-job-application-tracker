import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { FormLabel } from '@/shared/components/ui/form';
import { X } from 'lucide-react';
import _ from 'lodash';

// Mock skill data
const mockSkills = [
    'JavaScript',
    'React',
    'Node.js',
    'Tailwind CSS',
    'MongoDB',
];

const ProfileSkillsCombobox = () => {
    const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<
        string[]
    >([]);
    const [comboBoxInputValue, setComboBoxInputValue] = useState('');

    const handleAddSkill = () => {
        if (
            comboBoxInputValue.trim() &&
            !comboBoxSelectedValues.includes(comboBoxInputValue.trim())
        ) {
            setComboBoxSelectedValues((prev) => [
                ...prev,
                comboBoxInputValue.trim(),
            ]);
            setComboBoxInputValue('');
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setComboBoxSelectedValues((prev) =>
            prev.filter((item) => item !== skill)
        );
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
            <FormLabel className="text-lg font-semibold">Skills</FormLabel>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={comboBoxInputValue}
                    onChange={(e) => setComboBoxInputValue(e.target.value)}
                    placeholder="Enter a skill..."
                    className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                    onClick={handleAddSkill}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Add
                </Button>
            </div>

            {/* Skill Selection */}
            <div className="mt-4 grid grid-cols-2 gap-2">
                {mockSkills.map((skill) => (
                    <Button
                        key={skill}
                        onClick={() => handleAddSkill()}
                        className={`rounded-md border px-3 py-2 ${
                            comboBoxSelectedValues.includes(skill)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {skill}
                    </Button>
                ))}
            </div>

            {/* Display selected skills */}
            {comboBoxSelectedValues.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                    {comboBoxSelectedValues.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        >
                            <span className="text-sm">
                                {_.startCase(skill)}
                            </span>
                            <Button
                                className="h-fit rounded-full bg-transparent p-0 hover:bg-red-500 hover:text-white"
                                onClick={() => handleRemoveSkill(skill)}
                            >
                                <X size={15} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileSkillsCombobox;
