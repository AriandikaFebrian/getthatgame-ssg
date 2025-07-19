import React from "react";

interface GenreTagProps {
  genre: string;
  onClick?: (genre: string) => void;
  isSelected?: boolean;
}

export const GenreTag: React.FC<GenreTagProps> = ({ genre, onClick, isSelected }) => {
  const baseClasses = "inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded select-none";
  const selectedClasses = "bg-blue-800 text-white";
  const unselectedClasses = "bg-blue-100 text-blue-800";

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(genre);
    }
  };

  return (
<span
  className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${onClick ? "cursor-pointer" : "cursor-default"}`}
  onClick={onClick ? handleClick : undefined}
  role={onClick ? "button" : undefined}
  tabIndex={onClick ? 0 : undefined}
  onKeyDown={(e) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(genre);
    }
  }}
>
  {genre}
</span>

  );
};
