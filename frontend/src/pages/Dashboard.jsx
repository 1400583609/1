import React from 'react';
import { Row, Col, Card, Statistic, Button } from 'antd';
import { 
  HeartOutlined, 
  LineChartOutlined, 
  MedicineBoxOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import '../styles/Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>欢迎使用动维康健康管理平台</h1>
        <p className="platform-intro">
          动维康是一个专为老年人打造的综合健康管理平台，融合中医养生理念与现代医学科技，
          提供全方位的健康监测、管理和指导服务。
        </p>
      </div>

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日血压"
              value="120/80"
              prefix={<HeartOutlined />}
              suffix="mmHg"
            />
            <Button type="link">查看详情</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日步数"
              value={6500}
              prefix={<LineChartOutlined />}
              suffix="步"
            />
            <Button type="link">查看详情</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="待服药物"
              value={2}
              prefix={<MedicineBoxOutlined />}
              suffix="种"
            />
            <Button type="link">查看详情</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日提醒"
              value={3}
              prefix={<CalendarOutlined />}
              suffix="项"
            />
            <Button type="link">查看详情</Button>
          </Card>
        </Col>
      </Row>

      <h2 className="section-title">核心功能模块</h2>
      
      <Row gutter={[16, 16]} className="features-row">
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="健康数据监测与管理" 
            className="feature-card"
            hoverable
          >
            <p>多维度记录血压、血糖、心率等指标</p>
            <p>提供历史数据追踪和趋势分析</p>
            <p>数据可视化展示健康变化趋势</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="个性化运动处方" 
            className="feature-card"
            hoverable
          >
            <p>基于用户身体状况的全面评估</p>
            <p>提供三级运动计划和详细指导</p>
            <p>融合中医体育理念的运动设计</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="中医养生指导" 
            className="feature-card"
            hoverable
          >
            <p>经络养生、穴位按摩详解</p>
            <p>二十四节气养生法指导</p>
            <p>太极拳、八段锦等传统运动教学</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="AI智能问诊" 
            className="feature-card"
            hoverable
          >
            <p>基于AI技术的健康咨询服务</p>
            <p>症状分析和初步建议</p>
            <p>常见健康问题知识库</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="健康饮食指导" 
            className="feature-card"
            hoverable
          >
            <p>老年人营养需求分析</p>
            <p>个性化饮食建议和食谱推荐</p>
            <p>结合中医理论的食疗方案</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title="日程与提醒系统" 
            className="feature-card"
            hoverable
          >
            <p>用药、测量、运动等定时提醒</p>
            <p>健康任务完成度追踪</p>
            <p>集成所有健康活动的日历视图</p>
            <Button type="primary">立即使用</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 