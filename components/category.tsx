"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Container from "./container";
import CategoryBox from "./categorybox";
import { categories } from "@/lib/const/categories";

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get("category");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <Container>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-1 shadow-md",
              !canScrollLeft && "hidden"
            )}
            onClick={() => scrollCategories("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto px-4 py-4 scroll-smooth"
            onScroll={() => {
              const scrollContainer = scrollRef.current;
              if (scrollContainer) {
                const { scrollLeft, scrollWidth, clientWidth } =
                  scrollContainer;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
              }
            }}
          >
            {categories.map((item) => (
              <CategoryBox
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-1 shadow-md",
              !canScrollRight && "hidden"
            )}
            onClick={() => scrollCategories("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
