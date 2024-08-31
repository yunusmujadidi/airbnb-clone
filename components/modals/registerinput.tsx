import { DollarSign } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface RegisterInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register?: any;
  errors?: any;
  className?: string;
}

const RegisterInput = ({
  id,
  label,
  type = "text",
  disabled = false,
  formatPrice = false,
  required = false,
  register,
  errors,
  className,
}: RegisterInputProps) => {
  return (
    <div className={cn("w-full relative ", className)}>
      {formatPrice && (
        <DollarSign
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={cn(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          formatPrice ? "pl-9" : "pl-4",
          errors[id]
            ? "border-red-500 focus:border-rose-500"
            : "border-neutral-200 focus:border-black"
        )}
      />
      <label
        className={cn(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4",
          errors[id] ? "text-red-500" : "text-zinc-400",
          formatPrice ? "left-9" : "left-4"
        )}
      >
        {label}
      </label>
      {errors[id] && (
        <label className="text-red-500">{errors[id].message}</label>
      )}
    </div>
  );
};

export default RegisterInput;
