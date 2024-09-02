"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Camera, X, Loader2 } from "lucide-react";
import axios from "axios";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsUploading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "f22sc7r6");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/duo6ae15c/image/upload",
          formData
        )
        .then((response) => {
          onChange(response.data.secure_url);
          setIsUploading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setIsUploading(false);
        });
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            src={value}
            alt="Uploaded image"
            className="w-full h-full"
          />
          <button
            onClick={() => onChange("")}
            className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`relative cursor-pointer transition duration-200 ease-in-out border-2 p-20 rounded-lg flex flex-col justify-center items-center gap-4 text-gray-500 bg-gray-50
            ${
              isDragActive
                ? "border-red-400 bg-red-50"
                : "border-dashed border-gray-300 hover:border-gray-400"
            }`}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <Camera size={32} className="text-gray-600" />
          </div>
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
              <p className="mt-2 text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="text-lg font-semibold">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here"}
              </div>
              <p className="text-sm text-gray-400">or click to select a file</p>
              <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
