'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StatusCard from '@/components/dashboard/StatusCard'
import ConveyorLine from '@/components/dashboard/ConveyorLine'
import StateDot from '@/components/dashboard/StateDot'
import Legend from '@/components/dashboard/Legend'

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
    <div className="relative h-full w-full">
      {/* Top Row */}
      <StatusCard
        className="absolute"
        top={20}
        left={100}
        name="Broadcaster"
        state={statusDataMap["Broadcaster"]?.state || 0}
        runtime={(statusDataMap["Broadcaster"]?.runtime || 0) + ' min'}
        outfeed={statusDataMap["Broadcaster"]?.outfeed || 0}
        rejects={statusDataMap["Broadcaster"]?.rejects || 0}
        rate={statusDataMap["Broadcaster"]?.rate || 0}
        signalDistribution={statusDataMap["Broadcaster"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
      />

      <StatusCard
        className="absolute"
        top={20}
        left={500}
        name="Oven"
        state={statusDataMap["Oven"]?.state || 0}
        runtime={(statusDataMap["Oven"]?.runtime || 0) + ' min'}
        outfeed={statusDataMap["Oven"]?.outfeed || 0}
        rejects={statusDataMap["Oven"]?.rejects || 0}
        rate={statusDataMap["Oven"]?.rate || 0}
        signalDistribution={statusDataMap["Oven"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
      />

      <StatusCard
        className="absolute"
        top={20}
        left={900}
        name="Calibrator"
        state={statusDataMap["Calibrator"]?.state || 0}
        runtime={(statusDataMap["Calibrator"]?.runtime || 0) + ' min'}
        outfeed={statusDataMap["Calibrator"]?.outfeed || 0}
        rejects={statusDataMap["Calibrator"]?.rejects || 0}
        rate={statusDataMap["Calibrator"]?.rate || 0}
        signalDistribution={statusDataMap["Calibrator"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
      />

      <StatusCard
        className="absolute"
        top={300}
        left={100}
        name="Polisher"
        state={statusDataMap["Polisher"]?.state || 0}
        runtime={(statusDataMap["Polisher"]?.runtime || 0) + ' min'}
        outfeed={statusDataMap["Polisher"]?.outfeed || 0}
        rejects={statusDataMap["Polisher"]?.rejects || 0}
        rate={statusDataMap["Polisher"]?.rate || 0}
        signalDistribution={statusDataMap["Polisher"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
      />

      <StatusCard
        className="absolute"
        top={400}
        left={500}
        name="UV Oven"
        state={statusDataMap["UV Oven"]?.state || 0}
        runtime={(statusDataMap["UV Oven"]?.runtime || 0) + ' min'}
        outfeed={statusDataMap["UV Oven"]?.outfeed || 0}
        rejects={statusDataMap["UV Oven"]?.rejects || 0}
        rate={statusDataMap["UV Oven"]?.rate || 0}
        signalDistribution={statusDataMap["UV Oven"]?.signalDistribution || { running: 0, blocked: 0, starved: 0, unplannedDowntime: 0, plannedDowntime: 0 }}
      />

      <ConveyorLine orientation="horizontal" length={1300} top={120} left={0} />

      <ConveyorLine orientation="horizontal" length={450} top={400} left={0} />
      <ConveyorLine orientation="horizontal" length={450} top={400} left={850} />

      <ConveyorLine orientation="horizontal" length={400} top={300} left={450} />
      <ConveyorLine orientation="horizontal" length={400} top={500} left={450} />
      <ConveyorLine orientation="vertical" length={200} top={300} left={450} />
      <ConveyorLine orientation="vertical" length={200} top={300} left={850} />

      <ConveyorLine orientation="vertical" length={250} top={400} left={50} />
      <ConveyorLine orientation="vertical" length={50} top={600} left={650} />
      <ConveyorLine orientation="horizontal" length={600} top={650} left={50} />

      <StateDot state={2} top={20 + 100} left={50} />
      <StateDot state={2} top={20 + 100} left={450} />
      <StateDot state={0} top={20 + 100} left={850} />
      <StateDot state={1} top={400} left={50} />
      <StateDot state={3} top={400} left={450} />
      <StateDot state={2} top={400} left={950} />

      <h3 className='absolute text-xl font-semibold px-2 h-[28px]' style={{ left: 980, top: 400 - 14, backgroundColor: '#fff' }}>Store</h3>

      <Legend className="absolute bottom-2 right-2"/>
    </div>
  );
}
