import React from 'react';

interface ValueDisplayerProps {
  label: string;  // The label of the value (e.g. "Temperature")
  value: string | number;  // The value to display
  unit?: string;  // The unit of the value (e.g. "°C")
}

export default function ValueDisplayer({ label, value, unit }: ValueDisplayerProps) {
  return (
    <div className="flex items-center justify-between px-4 rounded-lg text-base"
      style={{ height: 48, minWidth: 200 }}>
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-900">{value}{unit}</span>
    </div>
  );
}
