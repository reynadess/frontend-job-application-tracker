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
      .map(part => part.charAt(0))
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
    <div className="flex flex-col items-center justify-center gap-4 my-4">
      <div className="flex justify-center items-center">
        <div className="w-64 h-64 rounded-full overflow-hidden cursor-pointer relative bg-gray-200 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-8xl font-bold text-gray-500">
              {nameInitials}
            </div>
          )}
        </div>
      </div>
      <span className="text-xs text-slate-500">Accepts .PNG, .JPEG, .JPG</span>
      <form className="flex mt-2">
        <label
          className="flex items-center justify-center gap-3 text-xs bg-slate-950 text-white rounded-full px-6 cursor-pointer h-10 w-32"
          htmlFor="profile-picture"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <PencilIcon className="w-4 h-4" />
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
          className={`flex items-center justify-center gap-3 text-xs text-red-400 bg-transparent border-none hover:bg-transparent h-10 px-4 ${!image ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="remove"
        >
          <Trash className="w-4 h-4" />
          Remove
        </button>
      </form>
    </div>
  );
};

export default ProfilePictureEditor;