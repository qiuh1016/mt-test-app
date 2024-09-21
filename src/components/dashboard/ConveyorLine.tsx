import React from 'react';

interface ConveyorLineProps {
  orientation: 'horizontal' | 'vertical';  // Line orientation (horizontal/vertical)
  length?: number;  // Length of the line (optional)
  className?: string;  // Additional classes (optional)
  styles?: React.CSSProperties;  // Additional styles (optional)
  top?: number;  // Top position of the line (optional)
  left?: number;  // Left position of the line (optional)
}

export default function ConveyorLine({
  orientation,
  length = 100,
  className,
  styles,
  top,
  left,
}: ConveyorLineProps) {
  return (
    <div
      className={`${className ?? ''} absolute bg-gray-400 rounded flex items-center justify-center`}
      style={{
        height: orientation === 'vertical' ? `${length}px` : '1px',
        width: orientation === 'horizontal' ? `${length}px` : '1px',
        top: `${top ?? 0}px`,
        left: `${left ?? 0}px`,
        ...styles
      }}
    >
    </div>
  );
}