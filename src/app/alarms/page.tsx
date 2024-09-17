import type { Metadata } from 'next'
import { Table, Card, Col, Row } from 'antd'

export const metadata: Metadata = {
  title: 'Dashboard - Index',
}

export default function Dashboard() {
  const dataSource = [{
    timestamp: '2021-10-01 12:00:00',
    type: 'Fault',
    description: 'Pump 1',
    condition: '>100',
    duration: '2 hours',
  }, {
    timestamp: '2021-10-02 12:00:00',
    type: 'Info',
    description: 'Pump 2',
    condition: '>100',
    duration: '10 minutes',
  }];
  const columns = [{
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'condition',
    dataIndex: 'condition',
    key: 'condition',
  }, {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  }];
  return (

    <Row className="p-4">
      <Col span={24}>
        <Card title="Alarm Log">
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </Col>
    </Row>
  );
}
