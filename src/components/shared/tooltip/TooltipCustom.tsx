import React, { ReactNode } from "react";
import { Tooltip } from "@material-tailwind/react";

interface TooltipCustomProps {
  content: string; // Texto que mostrará el tooltip
  placement?: "top" | "bottom" | "left" | "right"; // Posición opcional
  children: ReactNode; // Elemento que tendrá el tooltip
  color?: string; // Color opcional del tooltip
}

export const TooltipCustom: React.FC<TooltipCustomProps> = ({
  content,
  placement = "top",
  children,
  color = "blue",
}) => {
  return (
    <Tooltip
      content={content}
      placement={placement}
      className={`bg-${color}-900 text-gray-800 text-sm font-medium px-3 py-1 rounded-lg shadow-md`}
    >
      {children}
    </Tooltip>
  );
};
