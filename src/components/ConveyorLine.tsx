import React from 'react';

interface ConveyorLineProps {
  state: number;  // The state of the conveyor (0 for unplanned downtime, etc.)
  orientation: 'horizontal' | 'vertical';  // Line orientation (horizontal/vertical)
  length?: number;  // Length of the line (optional)
  className?: string;  // Additional classes (optional)
  styles?: React.CSSProperties;  // Additional styles (optional)
  dotStyles?: React.CSSProperties;  // Additional styles for the dot (optional)
}

export default function ConveyorLine({ state, orientation, length = 100, className, styles, dotStyles }: ConveyorLineProps) {
  const color = getConveyorColor(state);
  const sizeClass = orientation === 'vertical' ? 'w-2 h-full' : 'w-full h-2';
  return (
    <div
      className={`${className} absolute bg-gray-400 ${sizeClass} rounded flex items-center justify-center`}
      style={{
        height: orientation === 'vertical' ? `${length}px` : '1px',
        width: orientation === 'horizontal' ? `${length}px` : '1px',
        ...styles
      }}
    >
      <div className={`w-5 h-5 rounded-full ${color}`} style={dotStyles}></div>
    </div>
  );
}

function getConveyorColor(state: number) {
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
