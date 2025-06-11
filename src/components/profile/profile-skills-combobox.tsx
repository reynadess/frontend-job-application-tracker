import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Mock skill data for demonstration
const MOCK_SKILLS = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'React', label: 'React' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express', label: 'Express' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'SQL', label: 'SQL' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Tailwind CSS', label: 'Tailwind CSS' },
  { value: 'Git', label: 'Git' },
  { value: 'Docker', label: 'Docker' },
];

interface DropdownValue {
  value: string;
  label: string;
}

interface ProfileComboBoxProps {
  comboBoxSelectedValues: string[];
  setComboBoxSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  setComboBoxInputValue: React.Dispatch<React.SetStateAction<string>>;
  dropdownValues: DropdownValue[];
  isLoading: boolean;
}

// Simple ComboBox component
const ProfileComboBox: React.FC<ProfileComboBoxProps> = ({
  comboBoxSelectedValues,
  setComboBoxSelectedValues,
  setComboBoxInputValue,
  dropdownValues,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setComboBoxInputValue(e.target.value);
  };

  const handleSelectItem = (item: DropdownValue) => {
    if (!comboBoxSelectedValues.includes(item.value)) {
      setComboBoxSelectedValues([...comboBoxSelectedValues, item.value]);
    }
    setInputValue('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-700">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-transparent p-2 outline-none"
          placeholder="Search for skills..."
        />
        {isLoading && (
          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {dropdownValues.length > 0 ? (
            dropdownValues.map((item) => (
              <div
                key={item.value}
                className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSelectItem(item)}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No skills found</div>
          )}
        </div>
      )}
    </div>
  );
};

interface ProfileSkillsComboboxProps {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProfileSkillsCombobox: React.FC<ProfileSkillsComboboxProps> = ({
  selectedSkills,
  setSelectedSkills,
}) => {
  const [comboBoxInputValue, setComboBoxInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [skillDropdownValues, setSkillDropdownValues] = useState<
    DropdownValue[]
  >([]);

  // Mock API call with local filtering
  useEffect(() => {
    setIsLoading(true);

    // Simulate network delay
    const timeoutId = setTimeout(() => {
      const filteredSkills = MOCK_SKILLS.filter((skill) =>
        skill.label.toLowerCase().includes(comboBoxInputValue.toLowerCase())
      );
      setSkillDropdownValues(filteredSkills);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [comboBoxInputValue]);

  // Function to format text with first letter of each word capitalized
  const formatText = (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Skills</label>
        <ProfileComboBox
          comboBoxSelectedValues={selectedSkills}
          setComboBoxSelectedValues={setSelectedSkills}
          setComboBoxInputValue={setComboBoxInputValue}
          dropdownValues={skillDropdownValues}
          isLoading={isLoading}
        />
      </div>

      {selectedSkills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3 rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="group flex items-center">
              <div className="flex cursor-pointer items-center gap-1 rounded-full bg-slate-500 bg-opacity-10 px-4 py-2 text-sm font-medium text-slate-500 dark:bg-opacity-10 dark:text-slate-400">
                {formatText(skill)}
                <button
                  className="h-fit bg-transparent p-0 hover:bg-transparent"
                  onClick={() => {
                    setSelectedSkills(
                      selectedSkills.filter((item) => item !== skill)
                    );
                  }}
                >
                  <X className="text-slate-500" size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileSkillsCombobox;
