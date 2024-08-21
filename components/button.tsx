import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Google } from "./icon";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: LucideIcon;
  google?: boolean;
}
const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon,
  google,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ",
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",
        small
          ? "text-sm py-1 font-light border-[1px]"
          : "text-md py-3 font-semibold border-2"
      )}
    >
      {Icon && <Icon size={24} className="absolute left-5 top-3 " />}
      {google && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Google />
        </div>
      )}
      {label}
    </button>
  );
};

export default Button;
