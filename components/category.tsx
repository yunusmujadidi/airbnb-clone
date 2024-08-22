"use client";
import React from "react";
import Container from "./container";
import { TbBeach } from "react-icons/tb";
import {
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiWindmill,
  GiIsland,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineBedroomParent, MdOutlineVilla } from "react-icons/md";
import { FaRegSun, FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from "./categorybox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Amazing View",
    icon: FaRegSun,
    description: "This property has an amazing view!",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Rooms",
    icon: MdOutlineBedroomParent,
    description: "This property has many rooms!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is close to a ski resort!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property is close to a camping site!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is in the artic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
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
