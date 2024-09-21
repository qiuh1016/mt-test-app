'use client'

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import StatusCard, { StatusData } from '@/components/dashboard/StatusCard'
import ConveyorLine from '@/components/dashboard/ConveyorLine'
import StateDot from '@/components/dashboard/StateDot'
import Legend from '@/components/dashboard/Legend'

interface TagInfo {
  name: string,
  group: string,
  savePeriod: number,
  metadata: { [key: string]: unknown },
  value: unknown,
  ts: number,
  prevValue: unknown,
  prevTs: number,
}

interface StatusDataMap {
  [key: string]: StatusData;
}

const defaultStatusData: StatusData = {
  state: 0,
  runtime: 0,
  outfeed: 0,
  rejects: 0,
  rate: 0,
  signalDistribution: {
    running: 0,
    blocked: 0,
    starved: 0,
    unplannedDowntime: 0,
    plannedDowntime: 100,
  }
};

let socket: Socket;

export default function Dashboard() {

  const [statusDataMap, setStatusDataMap] = useState({} as StatusDataMap);

  const equitments = [{
    name: "Broadcaster",
    top: 20,
    left: 100
  }, {
    name: "Oven",
    top: 20,
    left: 500
  }, {
    name: "Calibrator",
    top: 20,
    left: 900
  }, {
    name: "Polisher",
    top: 300,
    left: 100
  }, {
    name: "UV Oven",
    top: 400,
    left: 500
  }]

  const lines = [{
    orientation: 'horizontal',
    length: 1300,
    top: 120,
    left: 0
  }, {
    orientation: 'horizontal',
    length: 450,
    top: 400,
    left: 0
  }, {
    orientation: 'horizontal',
    length: 450,
    top: 400,
    left: 850
  }, {
    orientation: 'horizontal',
    length: 400,
    top: 300,
    left: 450
  }, {
    orientation: 'horizontal',
    length: 400,
    top: 500,
    left: 450
  }, {
    orientation: 'vertical',
    length: 200,
    top: 300,
    left: 450
  }, {
    orientation: 'vertical',
    length: 200,
    top: 300,
    left: 850
  }, {
    orientation: 'vertical',
    length: 250,
    top: 400,
    left: 50
  }, {
    orientation: 'vertical',
    length: 50,
    top: 600,
    left: 650
  }, {
    orientation: 'horizontal',
    length: 600,
    top: 650,
    left: 50
  }];

  const dots = [{
    state: 2,
    top: 20 + 100,
    left: 50
  }, {
    state: 2,
    top: 20 + 100,
    left: 450
  }, {
    state: 0,
    top: 20 + 100,
    left: 850
  }, {
    state: 1,
    top: 400,
    left: 50
  }, {
    state: 3,
    top: 400,
    left: 450
  }, {
    state: 2,
    top: 400,
    left: 950
  }];

  useEffect(() => {
    // Connect to the server
    socket = io('/', {
      path: '/tag-engine-socket-io'
    });

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('sub', 'dashboard:status');
    });

    // Listen for status updates
    socket.on('value', (tagInfos: TagInfo[]) => {
      const data = tagInfos
        .find(tagInfo => tagInfo.group === 'dashboard' && tagInfo.name === 'status')?.value;
      const statusDataMap = JSON.parse(data as string) as StatusDataMap
      setStatusDataMap(statusDataMap);
    });

    return () => {
      // Clean up the socket connection
      console.log('Disconnecting from the server');
      if (socket) socket.close();
    };
  }, []);

  return (
    <div className="relative h-full w-full">

      {equitments.map((equitment, index) => (
        <StatusCard
          key={index}
          className="absolute"
          top={equitment.top}
          left={equitment.left}
          name={equitment.name}
          statusData={statusDataMap[equitment.name] ?? defaultStatusData}
        />
      ))}

      {
        lines.map((line, index) => (
          <ConveyorLine
            key={index}
            top={line.top}
            left={line.left}
            orientation={line.orientation as 'horizontal' | 'vertical'}
            length={line.length} />
        ))
      }

      {
        dots.map((dot, index) => (
          <StateDot key={index} state={dot.state} top={dot.top} left={dot.left} />
        ))
      }

      <h3 className='absolute text-xl font-semibold px-2 h-[28px]' style={{ left: 980, top: 400 - 14, backgroundColor: '#fff' }}>Store</h3>

      <Legend className="absolute bottom-2 right-2" />
    </div>
  );
}
