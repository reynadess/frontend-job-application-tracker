import { useCallback, useState } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/shared/components/ui/form';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { toast } from 'sonner';

const ProjectForm = ({
    handleClose,
    selectedProject,
    addUserProjects,
    editProject,
    submitImage,
    profileProjectSchema,
}: any) => {
    const [file, setFiles] = useState(null);
    const [previewImg, setPreviewImg] = useState(
        selectedProject?.projectThumbnail || null
    );

    const onDrop = useCallback((acceptedFiles: any) => {
        if (
            acceptedFiles[0].size < 1024 * 1024 * 5 && //5mb
            acceptedFiles[0].type.includes('image')
        ) {
            setFiles(acceptedFiles[0]);
            setPreviewImg(URL.createObjectURL(acceptedFiles[0]));
        } else {
            toast.error(
                'Project thumbnail should be a image and not more than 5 MB.'
            );
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const form = useForm({
        resolver: zodResolver(profileProjectSchema),
        defaultValues: {
            projectThumbnail: selectedProject?.projectThumbnail || './main.svg',
            projectSummary: selectedProject?.projectSummary || '',
            isFeature: selectedProject?.isFeature || false,
            projectGithub: selectedProject?.projectGithub || '',
            projectLiveLink: selectedProject?.projectLiveLink || '',
            projectName: selectedProject?.projectName || '',
            stack: selectedProject?.stack || 'OTHERS',
        },
    });

    async function onSubmit(data: any) {
        try {
            if (file) {
                data.projectThumbnail = (await submitImage(file)) ?? '';
            }
            if (!previewImg) {
                return;
            }
            let response;
            if (selectedProject?.id) {
                response = await editProject({
                    data: data,
                    id: selectedProject?.id,
                });
            } else {
                response = await addUserProjects(data);
            }

            if (!response.status) {
                return toast.error(response.message || 'Error');
            }
            toast.success(response.message);

            handleFormClose();
        } catch (_error) {
            toast.error('Something went wrong while Adding Skills');
        }
    }

    const handleFormClose = () => {
        form.reset();
        form.clearErrors();
        handleClose();
        handleImageReset();
    };

    const handleImageReset = () => {
        setFiles(null);
        setPreviewImg(null);
        form.setValue('projectThumbnail', './main.svg');
    };

    return (
        <div className="relative flex-1">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full flex-col justify-between space-y-8"
                >
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <FormLabel>Upload project thumbnail</FormLabel>
                            <div
                                {...getRootProps()}
                                className={`relative mt-2 flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-[8px] border border-transparent bg-slate-100 text-center dark:bg-slate-900 ${isDragActive && 'animate-pulse border-white'}`}
                            >
                                {previewImg && (
                                    <div
                                        onClick={handleImageReset}
                                        className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                                    >
                                        <X height={16} width={16} />
                                    </div>
                                )}
                                {!file && !previewImg && (
                                    <>
                                        <input
                                            {...getInputProps({
                                                accept: 'images',
                                            })}
                                        />
                                        <CirclePlus height={24} width={24} />
                                        <p className="mt-2 block text-base font-medium leading-6">
                                            Drag and drop an image <br />
                                            or click to upload
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Supported formats: JPEG, PNG. <br />
                                            Maximum file size: 5MB
                                        </p>
                                    </>
                                )}
                                {previewImg && (
                                    <img
                                        src={previewImg}
                                        alt="project-image"
                                        width={300}
                                        height={300}
                                        className="!h-full !w-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-xs text-red-700">
                                {!previewImg &&
                                    form.formState.errors.projectThumbnail
                                        ?.message &&
                                    'Project Thumbnail is required.'}
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter project name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectLiveLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Live Link"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectGithub"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Github Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Github Link"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Stack</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Others" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GO">
                                                    Go
                                                </SelectItem>
                                                <SelectItem value="PYTHON">
                                                    Python
                                                </SelectItem>
                                                <SelectItem value="MERN">
                                                    MERN
                                                </SelectItem>
                                                <SelectItem value="NEXTJS">
                                                    NextJS
                                                </SelectItem>
                                                <SelectItem value="AI_GPT_APIS">
                                                    AI/GPT APIs
                                                </SelectItem>
                                                <SelectItem value="SPRINGBOOT">
                                                    Springboot
                                                </SelectItem>
                                                <SelectItem value="OTHERS">
                                                    Others
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectSummary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe your project between 50 to 255
                                        characters.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
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
                                : selectedProject?.id
                                  ? 'Update Project'
                                  : 'Add Project'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProjectForm;
