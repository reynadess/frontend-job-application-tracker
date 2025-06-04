import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  profileSchema,
  ProfileSchemaType,
} from '@/schema/userProfileValidators'
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/enum/enums';
interface EditProfileFormProps {
  user?: User;
  onClose?: () => void;
  onSubmit?: (data: ProfileSchemaType) => Promise<void>;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ 
  user, 
  onClose, 
  onSubmit 
}) => {
  const [previewImg, setPreviewImg] = useState<string | null>(user?.avatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      contactEmail: user?.contactEmail || '',
      portfolioLink: user?.portfolioLink || '',
      githubLink: user?.githubLink || '',
      twitterLink: user?.twitterLink || '',
      linkedinLink: user?.linkedinLink || '',
      discordLink: user?.discordLink || '',
      aboutMe: user?.aboutMe || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('avatar', file);
    }
  };

  const clearLogoImage = () => {
    setPreviewImg(null);
    form.setValue('avatar', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleFormSubmit = async (data: ProfileSchemaType) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8 h-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-y-4">
          <FormLabel> Profile Picture </FormLabel>
          <div className="flex justify-center">
            <div
              onClick={handleUploadClick}
              className="w-40 h-40 relative dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
            >
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <FileUpIcon
                  height={80}
                  width={80}
                  className="text-white h-10 w-10"
                />
              )}
              {previewImg && (
                <button
                  type="button"
                  onClick={clearLogoImage}
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full items-center flex justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
                >
                  <X size="16" />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              id="fileInput"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@gmail.com"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@gmail.com"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Portfolio Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://x.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://discord.com/user"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
                <FormDescription>
                  Describe yourself between 50 to 255 characters.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="py-4 flex gap-4 justify-end">
          <Button
            type="reset"
            onClick={handleFormClose}
            variant={'outline'}
            className="mt-0 text-slate-500 dark:text-slate-400 rounded-[8px]"
          >
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="mt-0 text-white rounded-[8px]"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;