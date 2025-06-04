import { DegreeType, FieldOfStudyType } from '@/lib/enum/enums';
import { EducationType } from '@/types/user.types';
import React, { useState } from 'react';


// Define the Education type
// interface EducationType {
//   id?: number;
//   instituteName: string;
//   degree: DegreeType;
//   fieldOfStudy: FieldOfStudyType;
//   startDate?: Date;
//   endDate?: Date | null;
// }

interface EducationFormProps {
  handleClose: () => void;
  selectedEducation?: EducationType | null;
  onSubmitEducation?: (data: EducationType, id?: number) => Promise<{
    status: boolean;
    message: string;
  }>;
}

const formatDate = (date?: Date | null): string => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

const startCase = (str: string): string => {
  return str.toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const EducationForm: React.FC<EducationFormProps> = ({
  handleClose,
  selectedEducation = null,
  onSubmitEducation = async () => ({ status: true, message: 'Success' })
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EducationType>({
    instituteName: selectedEducation?.instituteName || '',
    degree: selectedEducation?.degree || DegreeType.BTECH,
    fieldOfStudy: selectedEducation?.fieldOfStudy || FieldOfStudyType.CS,
    startDate: selectedEducation?.startDate ? new Date(selectedEducation.startDate) : undefined,
    endDate: selectedEducation?.endDate ? new Date(selectedEducation.endDate) : null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (formData.instituteName.length < 2) {
      newErrors.instituteName = "Institute name must be at least 2 characters";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'startDate' | 'endDate') => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value ? new Date(value) : (field === 'endDate' ? null : undefined)
    });
  };

  const handleSelectChange = (value: string, field: 'degree' | 'fieldOfStudy') => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock submission - in a real app, this would call your API
      const response = await onSubmitEducation(formData, selectedEducation?.id);
      
      if (response.status) {
        // Show success message
        alert(response.message || 'Education saved successfully');
        handleClose();
      } else {
        // Show error message
        alert(response.message || 'Failed to save education');
      }
    } catch (error) {
      alert('Something went wrong while saving education');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 relative">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 h-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-y-4">
          {/* Institute Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleInputChange}
              placeholder="Enter Institute Name"
              className={`w-full p-2 border rounded-lg bg-white dark:bg-black ${errors.instituteName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.instituteName && (
              <p className="text-xs text-red-500">{errors.instituteName}</p>
            )}
          </div>
          
          {/* Degree Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Degree</label>
            <select
              value={formData.degree}
              onChange={(e) => handleSelectChange(e.target.value, 'degree')}
              className="w-full p-2 border border-gray-300 bg-white dark:bg-black rounded-lg "
            >
              {Object.values(DegreeType).map((type) => (
                <option key={type} value={type}>
                  {startCase(type)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Field of Study */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Field of Study</label>
            <select
              value={formData.fieldOfStudy}
              onChange={(e) => handleSelectChange(e.target.value, 'fieldOfStudy')}
              className="w-full p-2 border border-gray-300 bg-white dark:bg-black rounded-lg"
            >
              {Object.values(FieldOfStudyType).map((type) => (
                <option key={type} value={type}>
                  {startCase(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={formatDate(formData.startDate)}
              onChange={(e) => handleDateChange(e, 'startDate')}
              className={`w-full p-2 border rounded-lg bg-white dark:bg-black ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startDate && (
              <p className="text-xs text-red-500">{errors.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <input
              type="date"
              value={formatDate(formData.endDate)}
              onChange={(e) => handleDateChange(e, 'endDate')}
              className="w-full p-2 border bg-white dark:bg-black border-gray-300 rounded-lg"
            />
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="py-4 flex gap-4 justify-end">
          <button
            onClick={handleClose}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? 'Please wait...'
              : `${selectedEducation?.id ? 'Update Education' : 'Add Education'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;