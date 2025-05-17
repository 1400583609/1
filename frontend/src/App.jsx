import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LineChartOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  CoffeeOutlined,
  CalendarOutlined,
  SmileOutlined,
  TeamOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import './styles/App.scss';

// 页面导入
import Dashboard from './pages/Dashboard';
import HealthMonitoring from './pages/HealthMonitoring';
import TCMGuidance from './pages/TCMGuidance';

const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout className="app-container">
      <Header className="header">
        <div className="logo">动维康</div>
        <div className="subtitle">老年人健康管理平台</div>
      </Header>
      <Layout>
        <Sider width={240} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LineChartOutlined />}>
              <Link to="/health-monitoring">健康数据监测</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<HeartOutlined />}>
              <Link to="/exercise-plans">个性化运动处方</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<MedicineBoxOutlined />}>
              <Link to="/tcm-guidance">中医养生指导</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<MedicineBoxOutlined />}>
              <Link to="/ai-diagnosis">AI智能问诊</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<CoffeeOutlined />}>
              <Link to="/diet-guidance">健康饮食指导</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<CalendarOutlined />}>
              <Link to="/reminder">日程与提醒</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<SmileOutlined />}>
              <Link to="/meditation">冥想与心理健康</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<TeamOutlined />}>
              <Link to="/community">社区互动</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<FileTextOutlined />}>
              <Link to="/health-records">个人健康档案</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health-monitoring" element={<HealthMonitoring />} />
              <Route path="/exercise-plans" element={<div>个性化运动处方</div>} />
              <Route path="/tcm-guidance" element={<TCMGuidance />} />
              <Route path="/ai-diagnosis" element={<div>AI智能问诊</div>} />
              <Route path="/diet-guidance" element={<div>健康饮食指导</div>} />
              <Route path="/reminder" element={<div>日程与提醒系统</div>} />
              <Route path="/meditation" element={<div>冥想与心理健康</div>} />
              <Route path="/community" element={<div>社区互动</div>} />
              <Route path="/health-records" element={<div>个人健康档案</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App; 