import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import DeleteAccountDialog from './DeleteAccountDialog';

// Simple utility for avatar initials
const getNameInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Profile form schema
const UserProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;

type Props = {
  name: string;
  email: string;
};

// Mock EditProfilePicture component
const EditProfilePicture = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline">Remove</Button>
          <Button>Upload</Button>
        </div>
      </div>
    </div>
  );
};

export const EditProfile = ({ name, email }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof UserProfileSchemaType, e.target.value);
  };

  const handleFormSubmit = async (data: UserProfileSchemaType) => {
    try {
      // Simulate API call
      setIsPending(true);
      
      // Simulate a delay
      setTimeout(() => {
        setIsPending(false);
        // Display success message (replace with toast in real implementation)
        alert(`Profile updated successfully: ${JSON.stringify(data)}`);
      }, 1000);
    } catch (error: any) {
      setIsPending(false);
      // Display error message
      alert('Error updating profile');
    }
  };

  return (
    <div className="flex flex-col justify-center items-start my-3 gap-4">
      <div className="flex w-full p-4 border rounded-md mt-5">
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-20 h-20 rounded-full cursor-pointer">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userImage || undefined} />
                <AvatarFallback>
                  {getNameInitials(name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center sm:w-[330px] sm:h-auto h-screen bg-white dark:bg-slate-950 md:rounded-2xl">
            <DialogHeader>
              <DialogTitle>Profile Picture</DialogTitle>
              <DialogDescription>
                A profile picture helps others recognize you.
              </DialogDescription>
            </DialogHeader>
            <EditProfilePicture />
          </DialogContent>
        </Dialog>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 border rounded-md w-full min-h-[40vh]"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex justify-between items-center mb-3">
            <span>Profile Info</span>
            <DeleteAccountDialog />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
                </FormControl>
                <FormMessage />
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
                    {...field}
                    disabled={isPending}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full">
            <Button
              disabled={isPending}
              className="bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4 md:w-56 w-full"
              type="submit"
              aria-label="submit"
            >
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;