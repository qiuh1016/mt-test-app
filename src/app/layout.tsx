'use client';

import localFont from "next/font/local";
import "./globals.css";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, HomeFilled, ExperimentFilled, WarningFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  const siderItems = [
    {
      key: '/dashboard',
      label: 'Dashboard',
      icon: React.createElement(HomeFilled),
      onClick: () => router.push('/dashboard'),
    },
    {
      key: '/home',
      label: 'Home',
      icon: React.createElement(HomeFilled),
      onClick: () => router.push('/home'),
    },
    {
      key: '/brewing',
      label: 'Brewing',
      icon: React.createElement(ExperimentFilled),
      onClick: () => router.push('/brewing'),
    },
    {
      key: '/cellar',
      label: 'Cellar',
      icon: React.createElement(NotificationOutlined),
      children: [
        {
          key: '/cellar/',
          label: 'Cellar',
          icon: React.createElement(NotificationOutlined),
          onClick: () => router.push('/cellar'),
        },
        {
          key: '/cellar/chart',
          label: 'Chart',
          icon: React.createElement(NotificationOutlined),
          onClick: () => router.push('/cellar/chart'),
        },
      ],
    },
    {
      key: '/alarms',
      label: 'Alarm Log',
      icon: React.createElement(WarningFilled),
      onClick: () => router.push('/alarms'),
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Layout className="min-h-screen">
          <Header className="flex items-center p-0">
            <div className="demo-logo color px-8 text-white text-xl">
              Brookvale Distillery HMI
            </div>
          </Header>
          <Layout
            style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Sider style={{ background: "colorBgContainer" }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={[]}
                className="h-full"
                items={siderItems}
              />
            </Sider>
            <Content className="px-1 bg-gray-200 overflow-scroll">{children}</Content>
          </Layout>
        </Layout>

      </body>
    </html>
  );
}
