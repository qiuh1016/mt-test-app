'use client'

import type { Metadata } from 'next'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StatusCard from '@/components/StatusCard'
import ConveyorLine from '@/components/ConveyorLine'

let socket: any;

export default function Dashboard() {

  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    // Connect to the server
    socket = io('/', {
      path: '/tag-engine-socket-io'
    });

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('tagSub', JSON.stringify({ group: 'dashboard', tag: 'status' }));
    });

    // Listen for status updates
    socket.on('tagValue', (data: {
      name: string,
      group: string,
      savePeriod: number,
      metadata: { [key: string]: unknown },
      value: unknown,
      ts: number,
      prevValue: unknown,
      prevTs: number,
    }[]) => {
      console.log('Received status update:', data);
      setStatusData(data);
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
          state={0}
          runtime="27 sec"
          outfeed={17}
          rejects={2}
          rate={1.5}
          signalDistribution={{ running: 60, blocked: 20, starved: 15, unplannedDowntime: 5, plannedDowntime: 0 }}
        />
        <ConveyorLine state={2} orientation="horizontal" length={100} className='top-1/2 left-full' />
        <ConveyorLine state={2} orientation="horizontal" length={100} className='top-1/2 right-full' />
      </div>

      <div className="absolute top-[20px] left-[500px]">
        <StatusCard
          name="Oven"
          state={4}
          runtime="37 min"
          outfeed={13}
          rejects={0}
          rate={4.1}
          signalDistribution={{ running: 60, blocked: 20, starved: 15, unplannedDowntime: 5, plannedDowntime: 0 }}
        />
        <ConveyorLine state={0} orientation="horizontal" length={100} className='top-1/2 left-full' />
      </div>

      <div className="absolute top-[20px] left-[900px]">
        <StatusCard
          name="Calibrator"
          state={2}
          runtime="31 min"
          outfeed={9}
          rejects={0}
          rate={1.8}
          signalDistribution={{ running: 90, blocked: 0, starved: 10, unplannedDowntime: 0, plannedDowntime: 0 }}
        />
        <ConveyorLine state={-1} orientation="horizontal" length={100} className='top-1/2 left-full' />
      </div>

      <div className="absolute top-[300px] left-[100px]">
        <StatusCard
          name="Polisher"
          state={2}
          runtime="1.7 hours"
          outfeed={13}
          rejects={2}
          rate={1.7}
          signalDistribution={{ running: 90, blocked: 0, starved: 10, unplannedDowntime: 20, plannedDowntime: 0 }}
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
          state={1}
          runtime="1.1 min"
          outfeed={13}
          rejects={2}
          rate={1.7}
          signalDistribution={{ running: 90, blocked: 0, starved: 10, unplannedDowntime: 20, plannedDowntime: 40 }}
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
