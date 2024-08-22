"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

// use query-string
import qs from "query-string";
import { cn } from "@/lib/utils";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox = ({ label, icon: Icon, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  // useCallback to prevent re-rendering
  // using query-string to update query params
  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      // function to not remove previous query params
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // update query params when click a category by delete previous category
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-row items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected
          ? " border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
