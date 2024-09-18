import React from 'react';

interface LegendProps {
  className: string;
}

export default function Legend({ className }: LegendProps) {
  const legendItems = [
    { color: 'bg-red-500', label: 'Unplanned Downtime' },
    { color: 'bg-neutral-300', label: 'Planned Downtime' },
    { color: 'bg-orange-400', label: 'Blocked' },
    { color: 'bg-yellow-300', label: 'Starved' },
    { color: 'bg-green-500', label: 'Running' },
  ];

  return (
    <div className={`${className} border border-gray-500 rounded-sm p-4`}>
      <h3 className="font-semibold mb-2">LEGEND</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className={`w-4 h-4 rounded-full ${item.color} inline-block mr-2`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};