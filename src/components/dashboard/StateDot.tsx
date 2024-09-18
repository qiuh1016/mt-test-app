import React from 'react';

interface ConveyorLineProps {
  state: number;
  className?: string;  // Additional classes (optional)
  top?: number;  // Width of the line (optional)
  left?: number;  // Height of the line (optional)
}

export default function ConveyorLine({
  state,
  className,
  top,
  left,
}: ConveyorLineProps) {
  const color = getColor(state);
  return (
    <div className={`absolute w-5 h-5 rounded-full ${color} ${className}`}
      style={{ top: `calc(${top ?? 0}px - 0.625rem)`, left: `calc(${left ?? 0}px - 0.625rem)` }}></div>
  );
}

function getColor(state: number) {
  switch (state) {
    case 0:
      return 'bg-red-500'; // Unplanned Downtime
    case 1:
      return 'bg-orange-500'; // Blocked
    case 2:
      return 'bg-green-500'; // Running
    case 3:
      return 'bg-gray-400'; // Planned Downtime
    case 4:
      return 'bg-yellow-500'; // Starved
    default:
      return 'bg-transparent'; // Default gray for unknown state
  }
}
