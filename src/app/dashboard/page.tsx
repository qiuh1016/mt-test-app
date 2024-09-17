'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StatusCard from '@/components/StatusCard'
import ConveyorLine from '@/components/ConveyorLine'

type EquipmentState = 0 | 1 | 2 | 3 | 4;

interface StatusData {
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

interface StatusDataMap {
  [key: string]: StatusData;
}

let socket: any;

export default function Dashboard() {

  let [statusDataMap, setStatusDataMap] = useState({} as StatusDataMap);

  useEffect(() => {
    // Connect to the server
    socket = io('http://localhost:4000', {
      path: '/tag-engine-socket-io'
    });

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('message', 1);
    });

    // Listen for status updates
    socket.on('message', (data: StatusDataMap) => {
      // console.log('Received status update:', data);
      setStatusDataMap(data);
    });

    return () => {
      // Clean up the socket connection
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Top Row */}
      <div className="absolute top-[20px] left-[100px]">
        <StatusCard
          name="Broadcaster"
          state={statusDataMap["Broadcaster"]?.state || 0}
          runtime={(statusDataMap["Broadcaster"]?.runtime || 0) + ' min'}
          outfeed={statusDataMap["Broadcaster"]?.outfeed || 0}
          rejects={statusDataMap["Broadcaster"]?.rejects || 0}
          rate={statusDataMap["Broadcaster"]?.rate || 0}
          signalDistribution={statusDataMap["Broadcaster"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        <ConveyorLine state={2} orientation="horizontal" length={100} className='top-1/2 left-full' />
        <ConveyorLine state={2} orientation="horizontal" length={100} className='top-1/2 right-full' />
      </div>

      <div className="absolute top-[20px] left-[500px]">
        <StatusCard
          name="Oven"
          state={statusDataMap["Oven"]?.state || 0}
          runtime={(statusDataMap["Oven"]?.runtime || 0) + ' min'}
          outfeed={statusDataMap["Oven"]?.outfeed || 0}
          rejects={statusDataMap["Oven"]?.rejects || 0}
          rate={statusDataMap["Oven"]?.rate || 0}
          signalDistribution={statusDataMap["Oven"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        <ConveyorLine state={0} orientation="horizontal" length={100} className='top-1/2 left-full' />
      </div>

      <div className="absolute top-[20px] left-[900px]">
        <StatusCard
          name="Calibrator"
          state={statusDataMap["Calibrator"]?.state || 0}
          runtime={(statusDataMap["Calibrator"]?.runtime || 0) + ' min'}
          outfeed={statusDataMap["Calibrator"]?.outfeed || 0}
          rejects={statusDataMap["Calibrator"]?.rejects || 0}
          rate={statusDataMap["Calibrator"]?.rate || 0}
          signalDistribution={statusDataMap["Calibrator"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        <ConveyorLine state={-1} orientation="horizontal" length={100} className='top-1/2 left-full' />
      </div>

      <div className="absolute top-[300px] left-[100px]">
        <StatusCard
          name="Polisher"
          state={statusDataMap["Polisher"]?.state || 0}
          runtime={(statusDataMap["Polisher"]?.runtime || 0) + ' min'}
          outfeed={statusDataMap["Polisher"]?.outfeed || 0}
          rejects={statusDataMap["Polisher"]?.rejects || 0}
          rate={statusDataMap["Polisher"]?.rate || 0}
          signalDistribution={statusDataMap["Polisher"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        {/* horizontal line on the left */}
        <ConveyorLine state={-1} orientation="horizontal" length={100} className='top-1/2 right-full' />
        {/* horizontal line on the right, half */}
        <ConveyorLine state={-1} orientation="horizontal" length={50} className='top-1/2 left-full' />

        {/* horizontal line on the left */}
        <ConveyorLine state={-1} orientation="horizontal" length={600} styles={{ top: 350, left: -50 }} />
        {/* vertical line on the left */}
        <ConveyorLine state={-1} orientation="vertical" length={250} className='top-1/2' styles={{ left: -50 }} />


        {/* dot on the left */}
        <ConveyorLine state={1} orientation="horizontal" length={100} className='top-1/2' styles={{ left: -100, height: 0 }} />
      </div>

      <div className="absolute top-[400px] left-[500px]">
        <StatusCard
          name="UV Oven"
          state={statusDataMap["UV Oven"]?.state || 0}
          runtime={(statusDataMap["UV Oven"]?.runtime || 0) + ' min'}
          outfeed={statusDataMap["UV Oven"]?.outfeed || 0}
          rejects={statusDataMap["UV Oven"]?.rejects || 0}
          rate={statusDataMap["UV Oven"]?.rate || 0}
          signalDistribution={statusDataMap["UV Oven"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        {/* horizontal line on the left */}
        <ConveyorLine state={-1} orientation="horizontal" length={50} className='top-1/2 right-full' />
        {/* horizontal line on the right */}
        <ConveyorLine state={-1} orientation="horizontal" length={50} className='top-1/2 left-full' />
        {/* horizontal line on the top */}
        <ConveyorLine state={-1} orientation="horizontal" length={400} className='-top-1/2' styles={{ left: -50 }} />
        {/* vertical line on the left */}
        <ConveyorLine state={-1} orientation="vertical" length={200} className='-top-1/2' styles={{ left: -50 }} />
        {/* vertical line on the right */}
        <ConveyorLine state={-1} orientation="vertical" length={200} className='-top-1/2' styles={{ right: -50 }} />
        {/* vertical line on the bottom */}
        <ConveyorLine state={-1} orientation="vertical" length={50} className='top-full left-1/2' />
        {/* dot on the left */}
        <ConveyorLine state={3} orientation="horizontal" length={100} styles={{ left: -100, height: 0, top: 0 }} />
        {/* long line on the right */}
        <ConveyorLine state={-1} orientation="horizontal" length={450} styles={{ right: -500, top: 0 }} />
        {/* dot on the right */}
        <ConveyorLine state={2} orientation="horizontal" length={100} styles={{ right: -200, height: 0, top: 0 }} />

        <h3 className='absolute text-xl font-semibold px-2' style={{ right: -230, top: -15, backgroundColor: '#fff' }}>Store</h3>
      </div>
    </div>
  );
}
