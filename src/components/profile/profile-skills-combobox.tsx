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
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full p-2 outline-none bg-transparent"
          placeholder="Search for skills..."
        />
        {isLoading && (
          <div className="w-5 h-5 mr-2 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {dropdownValues.length > 0 ? (
            dropdownValues.map((item) => (
              <div
                key={item.value}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
  const [skillDropdownValues, setSkillDropdownValues] = useState<DropdownValue[]>([]);
  
  // Mock API call with local filtering
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay
    const timeoutId = setTimeout(() => {
      const filteredSkills = MOCK_SKILLS.filter(skill => 
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
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
        <div className="flex mt-3 flex-wrap gap-3 p-4 dark:bg-slate-900 bg-slate-100 rounded-lg">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="flex items-center group">
              <div className="font-medium text-sm cursor-pointer flex items-center gap-1 py-2 px-4 rounded-full bg-slate-500 bg-opacity-10 dark:bg-opacity-10 text-slate-500 dark:text-slate-400">
                {formatText(skill)}
                <button
                  className="p-0 h-fit bg-transparent hover:bg-transparent"
                  onClick={() => {
                    setSelectedSkills(selectedSkills.filter(item => item !== skill));
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