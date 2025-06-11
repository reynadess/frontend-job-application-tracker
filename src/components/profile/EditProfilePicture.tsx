import React, { useState } from 'react';
import { PencilIcon, Trash } from 'lucide-react';

interface ProfilePictureEditorProps {
  initialImage?: string;
  userName?: string;
}

export const ProfilePictureEditor: React.FC<ProfilePictureEditorProps> = ({
  initialImage = '',
  userName = '',
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get initials from name
  const getNameInitials = (name: string): string => {
    if (!name) return '';

    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const nameInitials = getNameInitials(userName);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    // Create a local preview URL
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setIsLoading(false);
      }
    };
    fileReader.readAsDataURL(file);

    // Here you would normally upload to backend
    // Instead, we're just showing a preview
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  return (
    <div className="my-4 flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <div className="relative flex h-64 w-64 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-8xl font-bold text-gray-500">
              {nameInitials}
            </div>
          )}
        </div>
      </div>
      <span className="text-xs text-slate-500">Accepts .PNG, .JPEG, .JPG</span>
      <form className="mt-2 flex">
        <label
          className="flex h-10 w-32 cursor-pointer items-center justify-center gap-3 rounded-full bg-slate-950 px-6 text-xs text-white"
          htmlFor="profile-picture"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <PencilIcon className="h-4 w-4" />
              Change
            </>
          )}
        </label>
        <input
          type="file"
          id="profile-picture"
          className="hidden"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageUpload}
          disabled={isLoading}
        />
        <button
          type="button"
          disabled={isLoading || !image}
          onClick={handleRemoveImage}
          className={`flex h-10 items-center justify-center gap-3 border-none bg-transparent px-4 text-xs text-red-400 hover:bg-transparent ${!image ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          aria-label="remove"
        >
          <Trash className="h-4 w-4" />
          Remove
        </button>
      </form>
    </div>
  );
};

export default ProfilePictureEditor;
