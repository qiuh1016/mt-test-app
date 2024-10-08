'use client'
import { Card, Col, Row } from "antd";
import { useEffect, useState } from 'react';
import ValueDisplayer from "@/components/ValueDisplayer";

export default function Home() {
  // Define state for the value
  const [value, setValue] = useState(1);

  // useEffect to set up the interval
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(parseFloat((Math.random() * 100).toFixed(2)));
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <Row className="p-4" gutter={16}>
      <Col span={8}>
      
      </Col>
      <Col span={8}>
        <Card title="Mash Lauter Tun - Mashing In" className="min-w-60" styles={{ body: { padding: "12px" } }}>
          <ValueDisplayer label="title" value={value} unit={"kPa"} />
          <ValueDisplayer label="title" value={value} unit={"kPa"} />
          <ValueDisplayer label="title" value={value} unit={"kPa"} />
          <ValueDisplayer label="title" value={value} unit={"kPa"} />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Default size card" className="min-w-60" styles={{ body: { padding: "12px" } }}>
          <ValueDisplayer label="title" value={value} unit={"%"} />
        </Card>
      </Col>
    </Row>
  );
}