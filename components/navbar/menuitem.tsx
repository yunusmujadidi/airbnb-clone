import React from "react";

const MenuItem = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuItem;
