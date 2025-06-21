import React, { ClipboardEvent, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema
const UserProfileDestroySchema = z.object({
    random: z.string().min(1, 'Please type the confirmation string'),
});

type UserProfileDestroyType = z.infer<typeof UserProfileDestroySchema>;

// Simple function to generate a random string
const generateRandomString = (length: number): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const DeleteAccountDialog = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileDestroyType>({
        resolver: zodResolver(UserProfileDestroySchema),
    });

    const [isPending, setIsPending] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [randomString, setRandomString] = useState<string>('');
    const [disabled, setDisabled] = useState(true);

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === randomString) {
            return setDisabled(false);
        }
        setDisabled(true);
    }

    const handleDeleteAccount = async () => {
        // Simulate loading state
        setIsPending(true);

        // Simulate API call
        setTimeout(() => {
            setIsPending(false);
            setModalOpen(false);

            // Placeholder for toast notification
            alert('Account deleted successfully');

            // Clear form and close modal
            setDisabled(true);
        }, 1500);
    };

    useEffect(() => {
        // Generate a random string when the component mounts
        setRandomString(generateRandomString(8));
    }, []);

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="mt-3"
                    onClick={() => setModalOpen(true)}
                    aria-label="delete-account"
                >
                    Delete my account
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <div className="flex justify-end">
                    <X
                        className="size-4 cursor-pointer"
                        onClick={() => setModalOpen(false)}
                    />
                </div>
                <DialogHeader className="text-start">
                    <DialogTitle>
                        Are you sure you want to delete your account?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and all associated data.
                        <form
                            className="mt-6"
                            onSubmit={handleSubmit(handleDeleteAccount)}
                        >
                            <label
                                className="text-black dark:text-gray-200"
                                htmlFor="random"
                            >
                                Type{' '}
                                <span className="rounded bg-gray-300 px-2 py-1 font-mono text-black dark:bg-gray-800 dark:text-white">
                                    {randomString}
                                </span>
                            </label>
                            <input
                                {...register('random')}
                                id="random"
                                className="mt-2 w-full rounded-md bg-gray-200 p-4 text-black outline-none dark:bg-black dark:text-white"
                                onPaste={(
                                    e: ClipboardEvent<HTMLInputElement>
                                ) => e.preventDefault()}
                                onChange={handleCheck}
                            />

                            {errors.random?.message && (
                                <p className="mt-2 text-red-500">
                                    {errors.random?.message}
                                </p>
                            )}

                            <div className="mt-4 flex items-baseline gap-2">
                                <Button
                                    disabled={disabled || isPending}
                                    className="bg-red-500 text-white hover:bg-red-600"
                                    type="submit"
                                    aria-label="submit"
                                >
                                    {isPending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        'Yes'
                                    )}
                                </Button>

                                <div
                                    className="cursor-pointer rounded-md border-2 bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 dark:border-slate-500 dark:bg-transparent dark:text-white hover:dark:bg-slate-800"
                                    onClick={() => setModalOpen(false)}
                                >
                                    <p>No</p>
                                </div>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;
