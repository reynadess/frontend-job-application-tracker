import  { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { X } from 'lucide-react';
import _ from 'lodash';

// Mock skill data
const mockSkills = ['JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'MongoDB'];

const ProfileSkillsCombobox = () => {
  const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<string[]>([]);
  const [comboBoxInputValue, setComboBoxInputValue] = useState('');

  const handleAddSkill = () => {
    if (
      comboBoxInputValue.trim() &&
      !comboBoxSelectedValues.includes(comboBoxInputValue.trim())
    ) {
      setComboBoxSelectedValues((prev) => [...prev, comboBoxInputValue.trim()]);
      setComboBoxInputValue('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setComboBoxSelectedValues((prev) => prev.filter((item) => item !== skill));
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
      <FormLabel className="text-lg font-semibold">Skills</FormLabel>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={comboBoxInputValue}
          onChange={(e) => setComboBoxInputValue(e.target.value)}
          placeholder="Enter a skill..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <Button
          onClick={handleAddSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </Button>
      </div>

      {/* Skill Selection */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {mockSkills.map((skill) => (
          <Button
            key={skill}
            onClick={() => handleAddSkill()}
            className={`px-3 py-2 rounded-md border ${
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
        <div className="flex flex-wrap gap-3 p-4 bg-gray-100 rounded-md mt-4 dark:bg-gray-700">
          {comboBoxSelectedValues.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            >
              <span className="text-sm">{_.startCase(skill)}</span>
              <Button
                className="p-0 h-fit bg-transparent hover:bg-red-500 hover:text-white rounded-full"
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
