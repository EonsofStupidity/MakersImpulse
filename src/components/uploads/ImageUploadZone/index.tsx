import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { validateImageFile, validateMaxCount, ACCEPTED_IMAGE_FORMATS } from "@/utils/validation";
import { ImageUploadZoneProps } from "./types";

const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ images, onImagesChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      validateImageFile(file) && validateMaxCount(images.length)
    );
    
    if (files.length > 0) {
      onImagesChange([...images, ...files].slice(0, 7));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => 
        validateImageFile(file) && validateMaxCount(images.length)
      );
      onImagesChange([...images, ...newFiles].slice(0, 7));
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null && confirmDelete) {
      onImagesChange(images.filter((_, i) => i !== deleteIndex));
    }
    setDeleteIndex(null);
    setConfirmDelete(false);
  };

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center space-y-4 w-[22%]">
        <Button
          asChild
          className="w-full py-2 bg-black/30 border border-white/10 text-white rounded-lg backdrop-blur-md hover:shadow-[0_0_12px_rgba(255,0,171,0.8)] transition-all hover:text-[#ff0abe]"
        >
          <label htmlFor="image-upload">
            Upload Image
            <input
              id="image-upload"
              type="file"
              multiple
              accept={ACCEPTED_IMAGE_FORMATS.join(',')}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </Button>

        <div
          className={`w-full h-[22.5vh] border-2 border-dashed ${
            dragActive ? 'border-[#ff0abe]' : 'border-[#41f0db]'
          } bg-black/30 rounded-lg flex items-center justify-center text-[#41f0db] text-sm relative transition-all ${
            dragActive ? 'scale-105' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <X 
              size={40} 
              className={`mb-2 ${dragActive ? 'animate-pulse text-[#ff0abe]' : ''}`}
            />
            Drop Images Here
            {images.length >= 7 && (
              <p className="text-[#ff0abe] mt-2">Maximum images (7) reached</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 flex-1">
        {images.map((file, index) => (
          <div key={index} className="relative group w-[150px] h-[150px]">
            <img
              src={URL.createObjectURL(file)}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => setDeleteIndex(index)}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={20} className="text-white hover:text-[#ff0abe]" />
            </button>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#ff0abe]">WARNING!</AlertDialogTitle>
            <AlertDialogDescription>
              Are you absolutely sure you want to delete this image?!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              id="confirm-delete"
              checked={confirmDelete}
              onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
            />
            <label htmlFor="confirm-delete">
              Yes, I am sure I want to delete this image
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmDelete(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={!confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageUploadZone;
