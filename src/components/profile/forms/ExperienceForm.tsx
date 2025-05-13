
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { expFormSchema } from '@/schema/userProfileValidators';
import { toast } from 'sonner';

// Assuming these enums are imported or defined elsewhere
const EmployementType = {
  Full_time: 'Full_time',
  Part_time: 'Part_time',
  Contract: 'Contract',
  Freelance: 'Freelance',
  Internship: 'Internship'
};

const WorkMode = {
  office: 'office',
  remote: 'remote',
  hybrid: 'hybrid'
};

const ExperienceForm = ({
  handleClose,
  selecetedExperience,
  addUserExperience,
  editExperience
}  : any) => {
  const form = useForm({
    resolver: zodResolver(expFormSchema),
    defaultValues: {
      companyName: selecetedExperience?.companyName || '',
      designation: selecetedExperience?.designation || '',
      EmploymentType: selecetedExperience?.EmploymentType || 'Full_time',
      address: selecetedExperience?.address || '',
      workMode: selecetedExperience?.workMode || 'office',
      currentWorkStatus: selecetedExperience?.currentWorkStatus || false,
      startDate: selecetedExperience?.startDate || undefined,
      endDate: selecetedExperience?.endDate || undefined,
      description: selecetedExperience?.description || '',
    },
  });
  
  const WatchCurrentWorkStatus = form.watch('currentWorkStatus');

  const onSubmit = async (data :any) => {
    try {
      let response;
      if (selecetedExperience?.id) {
        response = await editExperience({
          data: data,
          id: selecetedExperience?.id,
        });
      } else {
        response = await addUserExperience(data);
      }

      if (!response.status) {
        return toast.error(
        response.message
    
        );
      }
      
      toast.success(
        response.message
 
      );

      handleFormClose();
    } catch (_error) {
      toast.error(
     'Something went wrong while Adding Skills'
    
      );
    }
  };

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };

  return (
    <div className="flex-1 relative overflow-y-auto no-scrollbar">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 h-full flex flex-col justify-between"
        >
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="EmploymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(EmployementType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {_.startCase(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Mode</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(WorkMode).map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {_.startCase(mode)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentWorkStatus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Currently working here</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!WatchCurrentWorkStatus && (
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? field.value.toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe your role and responsibilities (50-255 characters)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 flex gap-4 justify-end">
            <Button
              onClick={handleFormClose}
              variant={'outline'}
              className="mt-0 text-slate-500 dark:text-white rounded-[8px]"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-0 text-white rounded-[8px]"
            >
              {form.formState.isSubmitting
                ? 'Please wait ...'
                : `${selecetedExperience?.id ? 'Update Experience' : 'Add Experience'}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperienceForm;