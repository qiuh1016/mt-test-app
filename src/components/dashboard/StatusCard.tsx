import React from 'react';
import VerticalValueDisplayer from '../VerticalValueDisplayer';
import { SignalFilled } from '@ant-design/icons';

interface StatusCardProps {
  className?: string;
  top?: number;
  left?: number;
  name: string;
  statusData: StatusData;
}

type EquipmentState = 0 | 1 | 2 | 3 | 4;

export interface StatusData {
  state: EquipmentState;
  runtime: number;
  outfeed: number;
  rejects: number
  rate: number;
  signalDistribution: {
    running: number;
    blocked: number;
    starved: number;
    unplannedDowntime: number;
    plannedDowntime: number;
  }
}

export default function StatusCard({
  className,
  top,
  left,
  name,
  statusData: {
    state,
    runtime,
    outfeed,
    rejects,
    rate,
    signalDistribution: signals,
  }
}: StatusCardProps) {

  const status = getStatusName(state as number);
  const color = getStatusColor(state);
  const signalTotal = Object.values(signals).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={`${className ?? ''} bg-white rounded-lg shadow-lg p-4 w-[300px] h-[200px] z-10 border border-neutral-300`}
      style={{ top: `${top ?? 0}px`, left: `${left ?? 0}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Status Indicator */}
          <div className={`w-5 h-5 rounded-full mr-2 ${color}`}></div>
          {/* Machine Name */}
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        {/* Runtime & Status */}
        <p className="text-gray-900 text-xs">{status} - {runtime}</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between mb-4 px-4 py-2 border-y border-gray-400">
        <VerticalValueDisplayer label="OUTFEED" value={outfeed} />
        <VerticalValueDisplayer label="REJECTS" value={rejects} />
        <VerticalValueDisplayer label="RATE" value={rate} unit="/hour" />
      </div>

      {/* Signals Section */}
      <div>
        <p className="text-sm font-medium text-center mb-2"><SignalFilled /> SIGNALS</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div className="bg-green-500" style={{ width: `${signals.running / signalTotal * 100}%` }}></div>
          <div className="bg-yellow-300" style={{ width: `${signals.starved / signalTotal * 100}%` }}></div>
          <div className="bg-orange-400" style={{ width: `${signals.blocked / signalTotal * 100}%` }}></div>
          <div className="bg-red-500" style={{ width: `${signals.unplannedDowntime / signalTotal * 100}%` }}></div>
          <div className="bg-neutral-300" style={{ width: `${signals.plannedDowntime / signalTotal * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(state: number) {
  switch (state) {
    case 0:
      return 'bg-red-500';
    case 1:
      return 'bg-orange-400';
    case 2:
      return 'bg-green-500';
    case 3:
      return 'bg-neutral-300';
    case 4:
      return 'bg-yellow-300';
    default:
      return 'bg-gray-100';
  }
}

function getStatusName(state: number) {
  switch (state) {
    case 0:
      return 'Unplanned DT';
    case 1:
      return 'Blocked';
    case 2:
      return 'Running';
    case 3:
      return 'Planned DT';
    case 4:
      return 'Starved';
    default:
      return 'Unknown';
  }
}