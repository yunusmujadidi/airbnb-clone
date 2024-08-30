"use client";
import React from "react";
import Container from "./container";
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
} from "lucide-react";
import CategoryBox from "./categorybox";
import { usePathname, useSearchParams } from "next/navigation";

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
    label: "Artic",
    icon: Snowflake,
    description: "This property is in the artic!",
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
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
