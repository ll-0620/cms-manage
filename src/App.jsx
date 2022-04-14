import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import './assets/base.css'
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <header>Header</header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <footer>&copy; 2022 ll-0620</footer>
    </Layout>
  )
}
