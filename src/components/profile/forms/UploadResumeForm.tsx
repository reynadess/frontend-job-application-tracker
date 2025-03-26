import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";

// Define schema for form validation
const profileResumeSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
});

type ProfileResumeType = z.infer<typeof profileResumeSchema>;

const UploadResumeForm = ({ handleClose }: { handleClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];

    if (
      selectedFile.size < 1048576 &&
      selectedFile.type === "application/pdf"
    ) {
      setFile(selectedFile);
    } else {
      toast.success("Resume should be a PDF file and not more than 1 MB.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 1048576, // 1MB
  });

  const form = useForm<ProfileResumeType>({
    resolver: zodResolver(profileResumeSchema),
    defaultValues: {
      resume: "",
    },
  });

  function onSubmit(data: ProfileResumeType) {
    // Placeholder for future backend implementation
    console.log("Form submitted with:", { data, file });
    toast.success("Resume submission placeholder");
    handleFormClose();
  }

  const handleFormClose = () => {
    form.reset();
    setFile(null);
    handleClose();
  };

  return (
    <div className="flex-1 relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-full flex flex-col justify-between"
        >
          <div>
            <FormLabel>Upload resume</FormLabel>
            <div
              {...getRootProps()}
              className={`w-full h-44 flex justify-center items-center flex-col bg-slate-100 dark:bg-slate-900 rounded-md border border-transparent text-center mt-2 cursor-pointer hover:border-gray-300 transition-colors ${
                isDragActive ? "animate-pulse border-white" : ""
              }`}
            >
              <input {...getInputProps()} />
              {!file && (
                <>
                  <CirclePlus size={24} />
                  <p className="font-medium text-base leading-6 block mt-2">
                    Drag and drop an image <br />
                    or click to upload
                  </p>
                  <p className="text-slate-400 text-xs">
                    Supported format: PDF <br />
                    Maximum file size: 1MB
                  </p>
                </>
              )}
              {file && (
                <>
                  <FileText size={24} />
                  <p className="font-medium text-base leading-6 block mt-2">
                    Selected File:
                  </p>
                  <p className="text-slate-400 text-xs">{file.name}</p>
                </>
              )}
            </div>
          </div>
          <div className="py-4 flex gap-4 justify-end">
            <Button
              onClick={handleFormClose}
              variant="outline"
              className="text-slate-500 dark:text-white rounded-md"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={form.formState.isSubmitting || !file}
              type="submit"
              className="text-white rounded-md"
            >
              {form.formState.isSubmitting ? "Please wait..." : "Add Resume"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadResumeForm;
