import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form';
import DeleteAccountDialog from '../components/DeleteAccountDialog';

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
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="mt-4 flex gap-2">
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
        form.setValue(
            e.target.name as keyof UserProfileSchemaType,
            e.target.value
        );
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
        <div className="my-3 flex flex-col items-start justify-center gap-4">
            <div className="mt-5 flex w-full rounded-md border p-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-20 w-20 cursor-pointer rounded-full">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={userImage || undefined} />
                                <AvatarFallback>
                                    {getNameInitials(name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="flex h-screen flex-col items-center justify-center bg-white dark:bg-slate-950 sm:h-auto sm:w-[330px] md:rounded-2xl">
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
                    className="flex min-h-[40vh] w-full flex-col gap-3 rounded-md border p-4"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                    <div className="mb-3 flex items-center justify-between">
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
                                        className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
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
                                        className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full justify-end">
                        <Button
                            disabled={isPending}
                            className="w-full rounded-md bg-slate-950 px-4 py-2 text-white dark:bg-white dark:text-slate-950 md:w-56"
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
