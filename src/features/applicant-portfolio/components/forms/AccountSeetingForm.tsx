import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/shared/components/ui/form';
import {
    UserPasswordSchema,
    UserPasswordSchemaType,
} from '../../schemas/userProfileValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { DeleteAccountDialog } from '../DeleteAccountDialog';

const AccountSeetingForm = ({ handleClose }: { handleClose: () => void }) => {
    const form = useForm<UserPasswordSchemaType>({
        resolver: zodResolver(UserPasswordSchema),
        defaultValues: {
            confirmNewPassword: '',
            currentPassword: '',
            newPassword: '',
        },
    });

    const handleFormClose = () => {
        form.clearErrors();
        form.reset();
        handleClose();
    };

    return (
        <div className="relative flex-1">
            <h2 className="mb-4 text-xl font-bold">Change password</h2>
            <Form {...form}>
                <form className="flex flex-col justify-between space-y-8 rounded-sm border px-3 py-3">
                    <div className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Current Password </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Current Password"
                                            type="password"
                                            {...field}
                                            className="rounded-[8px]"
                                        />
                                    </FormControl>
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
                                        <Input
                                            placeholder="New Password"
                                            type="password"
                                            {...field}
                                            className="rounded-[8px]"
                                        />
                                    </FormControl>
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
                                        <Input
                                            placeholder="Confirm New Password"
                                            {...field}
                                            className="rounded-[8px]"
                                            type="password"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
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
                                {form.formState.isSubmitting
                                    ? 'Please wait...'
                                    : 'Update Profile'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            <div className="mt-5 flex h-60 flex-col items-center justify-center rounded-md bg-red-600 bg-opacity-10 p-6 text-center">
                <TriangleAlert
                    height={32}
                    width={32}
                    className="text-[#DD503F]"
                />
                <h4 className="text-xl font-bold text-[#020817] dark:text-slate-50">
                    Delete account
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                </p>
                <DeleteAccountDialog />
            </div>
        </div>
    );
};

export default AccountSeetingForm;
