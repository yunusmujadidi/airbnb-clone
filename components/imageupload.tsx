"use client";

import { Camera, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <>
      {value ? (
        <div className="relative w-full h-[300px]">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={value}
            alt="Uploaded image"
            className="rounded-lg"
          />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <CldUploadWidget
          onSuccess={handleUpload}
          uploadPreset="f22sc7r6"
          options={{
            maxFiles: 1,
          }}
        >
          {({ open }) => (
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-28 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <Camera size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
            </div>
          )}
        </CldUploadWidget>
      )}
    </>
  );
};

export default ImageUpload;
