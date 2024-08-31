"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CategoryInputProps {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  className?: string;
}

const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
  className,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "rounded-lg border p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer",
        selected
          ? "border-primary bg-primary/5 text-primary"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
        className
      )}
    >
      <Icon size={24} className={selected ? "text-primary" : "text-gray-500"} />
      <div
        className={cn(
          "font-medium text-sm text-center",
          selected ? "text-primary" : "text-gray-700"
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
