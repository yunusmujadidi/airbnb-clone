"use client";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const Heading = ({ title, subtitle, center, className }: HeadingProps) => {
  return (
    <div className={cn(center ? "text-center" : "text-start", className)}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
