"use client";
import { useState, useEffect, useCallback } from "react";

import {
  Sun,
  Wind,
  Building,
  Bed,
  Palmtree,
  Castle,
  Tent,
  Snowflake,
  Mountain,
  Warehouse,
  Diamond,
  Shell,
  Waves,
  Trees,
  Coffee,
  Utensils,
  Car,
  Plane,
  Wifi,
  Tv,
  Anchor,
  Droplets,
  Dumbbell,
  Flame,
  Landmark,
  Leaf,
  PawPrint,
  Thermometer,
  Wine,
} from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Container from "./container";
import CategoryBox from "./categorybox";
import { usePathname } from "next/navigation";
export const categories = [
  {
    label: "Amazing View",
    icon: Sun,
    description: "This property has an amazing view!",
  },
  {
    label: "Beach",
    icon: Shell,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: Wind,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: Building,
    description: "This property is modern!",
  },
  {
    label: "Rooms",
    icon: Bed,
    description: "This property has many rooms!",
  },
  {
    label: "Island",
    icon: Palmtree,
    description: "This property is on an island!",
  },
  {
    label: "Skiing",
    icon: Mountain,
    description: "This property is close to a ski resort!",
  },
  {
    label: "Castles",
    icon: Castle,
    description: "This property is a castle!",
  },
  {
    label: "Camping",
    icon: Tent,
    description: "This property is close to a camping site!",
  },
  {
    label: "Arctic",
    icon: Snowflake,
    description: "This property is in the Arctic!",
  },
  {
    label: "Cave",
    icon: Mountain,
    description: "This property is in a cave!",
  },
  {
    label: "Barns",
    icon: Warehouse,
    description: "This property is a barn!",
  },
  {
    label: "Lux",
    icon: Diamond,
    description: "This property is luxurious!",
  },
  {
    label: "Surfing",
    icon: Waves,
    description: "This property is great for surfing!",
  },
  {
    label: "Forest",
    icon: Trees,
    description: "This property is surrounded by forest!",
  },
  {
    label: "Cafe Nearby",
    icon: Coffee,
    description: "This property has cafes nearby!",
  },
  {
    label: "Gourmet Kitchen",
    icon: Utensils,
    description: "This property has a gourmet kitchen!",
  },
  {
    label: "Parking",
    icon: Car,
    description: "This property has parking available!",
  },
  {
    label: "Airport Nearby",
    icon: Plane,
    description: "This property is close to an airport!",
  },
  {
    label: "Fast Wifi",
    icon: Wifi,
    description: "This property has fast WiFi!",
  },
  {
    label: "Smart TV",
    icon: Tv,
    description: "This property has a smart TV!",
  },
  {
    label: "Pool",
    icon: Droplets,
    description: "This property has a swimming pool!",
  },
  {
    label: "Hot Tub",
    icon: Thermometer,
    description: "This property has a hot tub!",
  },
  {
    label: "Gym",
    icon: Dumbbell,
    description: "This property has a fitness center or gym!",
  },
  {
    label: "Fireplace",
    icon: Flame,
    description: "This property has a cozy fireplace!",
  },
  {
    label: "Pet-friendly",
    icon: PawPrint,
    description: "This property welcomes pets!",
  },
  {
    label: "Waterfront",
    icon: Anchor,
    description: "This property is located on the waterfront!",
  },
  {
    label: "Historic",
    icon: Landmark,
    description: "This property has historical significance!",
  },
  {
    label: "Vineyard",
    icon: Wine,
    description: "This property is on or near a vineyard!",
  },

  {
    label: "Eco-friendly",
    icon: Leaf,
    description: "This property has eco-friendly features!",
  },
];

const useHorizontalScroll = (scrollAmount: number) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return { scrollRef, canScrollLeft, canScrollRight, handleScroll };
};

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get("category");
  const { scrollRef, canScrollLeft, canScrollRight, handleScroll } =
    useHorizontalScroll(200);

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="border-b border-gray-200 bg-white z-10">
      <Container>
        <div className="relative">
          <button
            className={cn(
              "absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 focus:outline-none",
              !canScrollLeft && "hidden"
            )}
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto px-4 py-4 scroll-smooth"
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
          <button
            className={cn(
              "absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 focus:outline-none",
              !canScrollRight && "hidden"
            )}
            onClick={() => handleScroll("right")}
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
