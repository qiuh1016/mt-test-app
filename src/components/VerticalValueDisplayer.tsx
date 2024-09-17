import React from 'react';

interface VerticalValueDisplayerProps {
  label: string;
  value: string | number;
  unit?: string;
}

export default function VerticalValueDisplayer({ label, value, unit }: VerticalValueDisplayerProps) {
  return (
    <div className="text-center">
      <span className="block font-bold text-xs text-gray-700">{label}</span>
      <div className="text-gray-500 text-xs mt-4">
        {value}
        {unit && <span>{unit}</span>}
      </div>
    </div>
  );
};
