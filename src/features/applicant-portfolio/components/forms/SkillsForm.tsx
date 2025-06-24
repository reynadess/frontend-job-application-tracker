import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';
import ProfileSkillsCombobox from '../profile-skills-combobox';
import { addSkillsSchema, addSkillsSchemaType } from '../../schemas/userProfileValidators';

export const SkillsForm = ({
    handleClose,
    skills,
}: {
    handleClose: () => void;
    skills: string[];
}) => {
    const [comboBoxSelectedValues, setComboBoxSelectedValues] =
        useState<string[]>(skills);

    const form = useForm<addSkillsSchemaType>({
        resolver: zodResolver(addSkillsSchema),
        defaultValues: {
            skills: skills,
        },
    });

    const handleFormClose = () => {
        form.reset();
        form.clearErrors();
        setComboBoxSelectedValues([]);
        handleClose();
    };

    return (
        <Form {...form}>
            <form className="flex h-full flex-col justify-between">
                <div>
                    <ProfileSkillsCombobox
                        selectedSkills={[]}
                        setSelectedSkills={function (
                            value: SetStateAction<string[]>
                        ): void {
                            throw new Error('Function not implemented.');
                        }}
                    ></ProfileSkillsCombobox>
                </div>
                <div className="flex justify-end gap-4 py-4">
                    <Button
                        onClick={handleFormClose}
                        variant={'outline'}
                        className="mt-0 rounded-[8px] text-slate-500 dark:text-white"
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
                            ? 'Please wait ...'
                            : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
