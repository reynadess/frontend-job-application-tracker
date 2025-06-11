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
} from '@/schema/userProfileValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
interface EditProfileFormProps {
  userDetails?: any;
  onClose?: () => void;
  onSubmit?: (data: ProfileSchemaType) => Promise<void>;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  userDetails,
  onClose,
  onSubmit,
}) => {
  const [previewImg, setPreviewImg] = useState<string | null>(
    userDetails?.avatar || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userDetails?.name || '',
      email: userDetails?.email || '',
      contactEmail: userDetails?.contactEmail || '',
      portfolioLink: userDetails?.portfolioLink || '',
      githubLink: userDetails?.githubLink || '',
      twitterLink: userDetails?.twitterLink || '',
      linkedinLink: userDetails?.linkedinLink || '',
      discordLink: userDetails?.discordLink || '',
      aboutMe: userDetails?.aboutMe || '',
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
      //TODO: when needed use file with proper types
      form.setValue('avatar', URL.createObjectURL(file));
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
        className="flex h-full flex-col justify-between space-y-8"
      >
        <div className="flex flex-col gap-y-4">
          <FormLabel> Profile Picture </FormLabel>
          <div className="flex justify-center">
            <div
              onClick={handleUploadClick}
              className="relative mb-2 flex h-40 w-40 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-500 bg-gray-300 dark:bg-gray-700"
            >
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <FileUpIcon
                  height={80}
                  width={80}
                  className="h-10 w-10 text-white"
                />
              )}
              {previewImg && (
                <button
                  type="button"
                  onClick={clearLogoImage}
                  className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-red-500"
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
        <div className="flex justify-end gap-4 py-4">
          <Button
            type="reset"
            onClick={handleFormClose}
            variant={'outline'}
            className="mt-0 rounded-[8px] text-slate-500 dark:text-slate-400"
          >
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="mt-0 rounded-[8px] text-white"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
