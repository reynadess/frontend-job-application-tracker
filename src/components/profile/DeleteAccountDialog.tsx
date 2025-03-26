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
  random: z.string().min(1, 'Please type the confirmation string')
});

type UserProfileDestroyType = z.infer<typeof UserProfileDestroySchema>;

// Simple function to generate a random string
const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
            className="cursor-pointer size-4"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <DialogHeader className="text-start">
          <DialogTitle>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and all associated data.
            <form className="mt-6" onSubmit={handleSubmit(handleDeleteAccount)}>
              <label className="text-black dark:text-gray-200" htmlFor="random">
                Type{' '}
                <span className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white font-mono px-2 py-1 rounded">
                  {randomString}
                </span>
              </label>
              <input
                {...register('random')}
                id="random"
                className="mt-2 p-4 rounded-md w-full bg-gray-200 dark:bg-black outline-none text-black dark:text-white"
                onPaste={(e: ClipboardEvent<HTMLInputElement>) =>
                  e.preventDefault()
                }
                onChange={handleCheck}
              />

              {errors.random?.message && (
                <p className="mt-2 text-red-500">{errors.random?.message}</p>
              )}

              <div className="flex gap-2 items-baseline mt-4">
                <Button
                  disabled={disabled || isPending}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  type="submit"
                  aria-label="submit"
                >
                  {isPending ? <Loader2 className="animate-spin" /> : 'Yes'}
                </Button>

                <div
                  className="bg-gray-200 dark:bg-transparent text-black dark:text-white hover:bg-gray-300 hover:dark:bg-slate-800 border-2 dark:border-slate-500 py-2 px-4 cursor-pointer rounded-md"
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