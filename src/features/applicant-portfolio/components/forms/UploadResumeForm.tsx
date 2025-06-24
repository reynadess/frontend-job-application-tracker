import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Form, FormLabel } from '@/shared/components/ui/form';
import { toast } from 'sonner';

// Define schema for form validation
const profileResumeSchema = z.object({
    resume: z.string().min(1, 'Resume is required'),
});

type ProfileResumeType = z.infer<typeof profileResumeSchema>;

const UploadResumeForm = ({ handleClose }: { handleClose: () => void }) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const selectedFile = acceptedFiles[0];

        if (
            selectedFile.size < 1048576 &&
            selectedFile.type === 'application/pdf'
        ) {
            setFile(selectedFile);
        } else {
            toast.success(
                'Resume should be a PDF file and not more than 1 MB.'
            );
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxSize: 1048576, // 1MB
    });

    const form = useForm<ProfileResumeType>({
        resolver: zodResolver(profileResumeSchema),
        defaultValues: {
            resume: '',
        },
    });

    function onSubmit(data: ProfileResumeType) {
        // Placeholder for future backend implementation
        console.log('Form submitted with:', { data, file });
        toast.success('Resume submission placeholder');
        handleFormClose();
    }

    const handleFormClose = () => {
        form.reset();
        setFile(null);
        handleClose();
    };

    return (
        <div className="relative flex-1">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full flex-col justify-between space-y-8"
                >
                    <div>
                        <FormLabel>Upload resume</FormLabel>
                        <div
                            {...getRootProps()}
                            className={`mt-2 flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-transparent bg-slate-100 text-center transition-colors hover:border-gray-300 dark:bg-slate-900 ${
                                isDragActive ? 'animate-pulse border-white' : ''
                            }`}
                        >
                            <input {...getInputProps()} />
                            {!file && (
                                <>
                                    <CirclePlus size={24} />
                                    <p className="mt-2 block text-base font-medium leading-6">
                                        Drag and drop an image <br />
                                        or click to upload
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Supported format: PDF <br />
                                        Maximum file size: 1MB
                                    </p>
                                </>
                            )}
                            {file && (
                                <>
                                    <FileText size={24} />
                                    <p className="mt-2 block text-base font-medium leading-6">
                                        Selected File:
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {file.name}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 py-4">
                        <Button
                            onClick={handleFormClose}
                            variant="outline"
                            className="rounded-md text-slate-500 dark:text-white"
                            type="reset"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={form.formState.isSubmitting || !file}
                            type="submit"
                            className="rounded-md text-white"
                        >
                            {form.formState.isSubmitting
                                ? 'Please wait...'
                                : 'Add Resume'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UploadResumeForm;
