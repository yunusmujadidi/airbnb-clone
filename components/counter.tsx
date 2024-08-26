import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const plus = () => {
    if (value < 10) {
      onChange(value + 1);
    }
  };

  const minus = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between py-4 border-b border-gray-200">
      <div className="flex flex-col">
        <div className="text-base font-normal text-gray-800">{title}</div>
        <div className="text-sm font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={minus}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200",
            value <= 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:border-gray-700 hover:text-gray-700"
          )}
          disabled={value <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="text-base font-normal text-gray-800 w-6 text-center">
          {value}
        </span>
        <button
          onClick={plus}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200",
            value >= 10
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:border-gray-700 hover:text-gray-700"
          )}
          disabled={value >= 10}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
