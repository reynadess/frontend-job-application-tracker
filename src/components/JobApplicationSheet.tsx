import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ApplicationStatus,
  ApplicationsType,
  Status_Options,
} from '@/types/applications.types';
import { userApplicationTypes } from '@/schema/userApplications';
import { CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useApplicationsStore } from '@/hooks/zustand/store/useApplicationsStore';

interface Props {
  selectedApplication?: ApplicationsType | null;
  handleClose: () => void;
}

export function JobApplicationSheet({
  selectedApplication,
  handleClose,
}: Props) {
  // Initialize date as undefined instead of new Date()
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const createApplication = useApplicationsStore(
    (state) => state.createApplication
  );
  const updateApplication = useApplicationsStore(
    (state) => state.updateApplicationById
  );
  const getAllUserApplications = useApplicationsStore(
    (state) => state.getAllUserApplications
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<userApplicationTypes>({
    defaultValues: {
      company: '',
      role: '',
      ctcOffered: 0,
      city: '',
      state: '',
      country: '',
      description: '',
      status: ApplicationStatus.Apply,
      appliedDate: '', // Initialize as empty string
    },
  });

  // Watch the appliedDate field to keep date state in sync
  const appliedDateValue = watch('appliedDate');

  const onSubmit = async (data: userApplicationTypes) => {
    setIsSubmitting(true);
    try {
      if (selectedApplication) {
        const updatedData = {
          status: data.status,
          appliedDate: data.appliedDate,
        };
        await updateApplication(selectedApplication.id, updatedData);
      } else {
        await createApplication(data);
      }
      await getAllUserApplications();
      handleClose();
      reset();
      setDate(undefined); // Reset date state as well

      // Show success message
      toast.success(
        selectedApplication
          ? 'Application updated successfully'
          : 'Application created successfully'
      );
    } catch (error) {
      toast.error(
        selectedApplication
          ? 'Failed to update application'
          : 'Failed to create application'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Populate form when selectedApplication changes
  useEffect(() => {
    if (selectedApplication) {
      setValue('company', selectedApplication.company || '');
      setValue('role', selectedApplication.role || '');
      setValue('city', selectedApplication.city || '');
      setValue('state', selectedApplication.state || '');
      setValue('country', selectedApplication.country || '');
      setValue('description', selectedApplication.description || '');
      setValue('jobLink', selectedApplication.jobLink || '');
      setValue('status', selectedApplication.status || '');

      if (selectedApplication.appliedDate) {
        const applicationDate = new Date(selectedApplication.appliedDate);
        setDate(applicationDate);
        setValue('appliedDate', format(applicationDate, 'yyyy-MM-dd'));
      } else {
        setDate(undefined);
        setValue('appliedDate', '');
      }
    } else {
      // When no application is selected (new application), reset to empty
      setDate(undefined);
      setValue('appliedDate', '');
    }
  }, [selectedApplication, setValue]);

  // Sync date state when form appliedDate changes
  useEffect(() => {
    if (
      appliedDateValue &&
      appliedDateValue !== format(date || new Date(), 'yyyy-MM-dd')
    ) {
      const newDate = new Date(appliedDateValue);
      if (!isNaN(newDate.getTime())) {
        setDate(newDate);
      }
    }
  }, [appliedDateValue, date]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setValue('appliedDate', format(selectedDate, 'yyyy-MM-dd'));
    } else {
      setValue('appliedDate', '');
    }
  };

  const isEditMode = !!selectedApplication?.id;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
      <div className="space-y-4">
        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Enter company name"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('company', {
              required: !isEditMode ? 'Company is required' : false,
            })}
          />
          {errors.company && !isEditMode && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="role">Position</Label>
          <Input
            id="role"
            placeholder="Enter job position"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('role', {
              required: !isEditMode ? 'Position is required' : false,
            })}
          />
          {errors.role && !isEditMode && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <Label htmlFor="ctcOffered">Salary</Label>
          <Input
            id="ctcOffered"
            type="number"
            placeholder="e.g. 75000"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('ctcOffered', {
              valueAsNumber: true,
              validate: (value) =>
                isEditMode || !isNaN(value) || 'Please enter a valid number',
              min: !isEditMode
                ? {
                    value: 0,
                    message: 'Salary cannot be negative',
                  }
                : undefined,
            })}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. Remote, New York, NY"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('city')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="e.g. New York"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('state')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="e.g. United States"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('country')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobLink">Job Link</Label>
          <Input
            id="jobLink"
            placeholder="https://www.company.com/careers/job-id"
            readOnly={isEditMode}
            className={isEditMode ? 'cursor-not-allowed' : ''}
            {...register('jobLink')}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of the role"
            className={`min-h-20 ${isEditMode ? 'cursor-not-allowed' : ''}`}
            readOnly={isEditMode}
            {...register('description')}
          />
        </div>

        {/* Applied Date - Always shown */}
        <div className="space-y-2">
          <Label htmlFor="appliedDate">Applied Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Status - Always shown */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch('status')}
            onValueChange={(value: ApplicationStatus) =>
              setValue('status', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Status_Options.map((status) => (
                <SelectItem key={status.uid} value={status.uid}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-4 py-4">
          <button
            onClick={handleClose}
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting
              ? 'Please wait...'
              : `${
                  selectedApplication?.id
                    ? 'Update Application'
                    : 'Add Application'
                }`}
          </button>
        </div>
      </div>
    </form>
  );
}
