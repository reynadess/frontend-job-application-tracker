'use client';

import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserPasswordSchema,
  UserPasswordSchemaType,
} from '@/schema/userProfileValidators';

import { Input } from '../ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Loader from '../Loader';

export const ChangePassword = () => {
  const { register, watch } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<UserPasswordSchemaType>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      e.target.name as keyof UserPasswordSchemaType,
      e.target.value
    );
  };

  return (
    <Form {...form}>
      <form className="flex min-h-[45vh] w-full flex-col gap-3 p-4">
        <p className="text-md">Change your password</p>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    onChange={handleInputChange}
                    className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    {...register('newPassword', { required: true })}
                    onChange={handleInputChange}
                    className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmNewPassword', {
                      required: true,
                      validate: (val: string) => {
                        return val !== watch('newPassword')
                          ? 'Passwords do not match'
                          : true;
                      },
                    })}
                    onChange={handleInputChange}
                    className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                    aria-label="password"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button
            disabled={isPending}
            className="w-full rounded-md bg-slate-950 px-4 py-2 text-white dark:bg-white dark:text-slate-950 md:w-56"
            aria-label="save"
          >
            {isPending ? <Loader /> : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
