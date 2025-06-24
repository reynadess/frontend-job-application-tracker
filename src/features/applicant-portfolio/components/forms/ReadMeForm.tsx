import { Button } from '@/shared/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/shared/components/ui/form';
import { Textarea } from '@/shared/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    aboutMeSchema,
    AboutMeSchemaType,
} from '../../schemas/userProfileValidators';

const AboutMeForm = ({
    handleClose,
    aboutMe,
}: {
    handleClose: () => void;
    aboutMe: string;
}) => {
    const form = useForm<AboutMeSchemaType>({
        resolver: zodResolver(aboutMeSchema),
        defaultValues: {
            aboutMe: aboutMe || '',
        },
    });

    const handleFormClose = () => {
        form.reset();
        handleClose();
    };

    return (
        <div className="relative flex-1">
            <Form {...form}>
                <form className="flex h-full flex-col justify-between space-y-8">
                    <div>
                        <FormField
                            control={form.control}
                            name="aboutMe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe yourself between 50 to 255
                                        characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-4 py-4">
                        <Button
                            onClick={handleFormClose}
                            variant={'outline'}
                            className="mt-0 rounded-[8px] text-slate-500 dark:text-slate-400"
                            type="reset"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                            className="mt-0 rounded-[8px] text-white"
                        >
                            {form.formState.isSubmitting
                                ? 'Please Wait...'
                                : aboutMe
                                  ? 'Update About Me'
                                  : 'Add About Me'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AboutMeForm;
