import React, { useState } from 'react';
import { 
  Tabs, 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  TimePicker, 
  Select, 
  Card, 
  Table, 
  Tag,
  Row,
  Col,
  Typography,
  Statistic
} from 'antd';
import { Line } from '@ant-design/plots';
import moment from 'moment';
import { 
  HeartOutlined, 
  ColumnHeightOutlined, 
  DashboardOutlined,
  ScaleOutlined, 
  ClockCircleOutlined
} from '@ant-design/icons';
import { evaluateBloodPressure, evaluateBloodGlucose, BloodPressureStatus } from '../types/health';
import '../styles/HealthMonitoring.scss';

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

/**
 * 血压状态对应的标签颜色
 */
const bloodPressureColors = {
  [BloodPressureStatus.NORMAL]: 'success',
  [BloodPressureStatus.ELEVATED]: 'warning',
  [BloodPressureStatus.HYPERTENSION_1]: 'warning',
  [BloodPressureStatus.HYPERTENSION_2]: 'error',
  [BloodPressureStatus.HYPERTENSION_CRISIS]: 'error',
  [BloodPressureStatus.HYPOTENSION]: 'warning',
  'error': 'default'
};

/**
 * 血压状态中文映射
 */
const bloodPressureLabels = {
  [BloodPressureStatus.NORMAL]: '正常',
  [BloodPressureStatus.ELEVATED]: '偏高',
  [BloodPressureStatus.HYPERTENSION_1]: '高血压1级',
  [BloodPressureStatus.HYPERTENSION_2]: '高血压2级',
  [BloodPressureStatus.HYPERTENSION_CRISIS]: '高血压危象',
  [BloodPressureStatus.HYPOTENSION]: '低血压',
  'error': '评估出错'
};

/**
 * 模拟的血压历史数据
 */
const mockBloodPressureData = [
  { id: 1, systolic: 120, diastolic: 80, date: '2023-05-17', time: '08:30', notes: '晨起测量' },
  { id: 2, systolic: 118, diastolic: 76, date: '2023-05-16', time: '08:45', notes: '晨起测量' },
  { id: 3, systolic: 135, diastolic: 85, date: '2023-05-15', time: '09:00', notes: '服药前测量' },
  { id: 4, systolic: 125, diastolic: 82, date: '2023-05-14', time: '08:30', notes: '晨起测量' },
  { id: 5, systolic: 130, diastolic: 84, date: '2023-05-13', time: '08:15', notes: '晨起测量' },
  { id: 6, systolic: 127, diastolic: 79, date: '2023-05-12', time: '08:30', notes: '晨起测量' },
  { id: 7, systolic: 132, diastolic: 83, date: '2023-05-11', time: '08:45', notes: '晨起测量' },
];

/**
 * 模拟的血糖历史数据
 */
const mockBloodGlucoseData = [
  { id: 1, value: 5.8, type: '空腹', date: '2023-05-17', time: '07:30', notes: '晨起测量' },
  { id: 2, value: 7.2, type: '餐后', date: '2023-05-17', time: '13:00', notes: '午餐后2小时' },
  { id: 3, value: 5.9, type: '空腹', date: '2023-05-16', time: '07:45', notes: '晨起测量' },
  { id: 4, value: 7.5, type: '餐后', date: '2023-05-16', time: '13:15', notes: '午餐后2小时' },
  { id: 5, value: 6.1, type: '空腹', date: '2023-05-15', time: '07:30', notes: '晨起测量' },
  { id: 6, value: 7.8, type: '餐后', date: '2023-05-15', time: '13:00', notes: '午餐后2小时' },
  { id: 7, value: 5.7, type: '空腹', date: '2023-05-14', time: '07:40', notes: '晨起测量' },
];

/**
 * 健康数据监测组件
 */
const HealthMonitoring = () => {
  // 当前活动标签页
  const [activeTab, setActiveTab] = useState('1');
  
  // 血压数据状态
  const [bloodPressureForm] = Form.useForm();
  const [bloodPressureData, setBloodPressureData] = useState(mockBloodPressureData);
  
  // 血糖数据状态
  const [bloodGlucoseForm] = Form.useForm();
  const [bloodGlucoseData, setBloodGlucoseData] = useState(mockBloodGlucoseData);

  /**
   * 提交血压数据
   * @param {Object} values 表单值
   */
  const handleBloodPressureSubmit = (values) => {
    try {
      const newRecord = {
        id: bloodPressureData.length + 1,
        systolic: values.systolic,
        diastolic: values.diastolic,
        date: values.measureDate.format('YYYY-MM-DD'),
        time: values.measureTime.format('HH:mm'),
        notes: values.notes || ''
      };
      
      setBloodPressureData([newRecord, ...bloodPressureData]);
      bloodPressureForm.resetFields();
    } catch (error) {
      console.error('提交血压数据出错:', error);
    }
  };

  /**
   * 提交血糖数据
   * @param {Object} values 表单值
   */
  const handleBloodGlucoseSubmit = (values) => {
    try {
      const newRecord = {
        id: bloodGlucoseData.length + 1,
        value: values.value,
        type: values.type,
        date: values.measureDate.format('YYYY-MM-DD'),
        time: values.measureTime.format('HH:mm'),
        notes: values.notes || ''
      };
      
      setBloodGlucoseData([newRecord, ...bloodGlucoseData]);
      bloodGlucoseForm.resetFields();
    } catch (error) {
      console.error('提交血糖数据出错:', error);
    }
  };

  /**
   * 血压数据表格列定义
   */
  const bloodPressureColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '收缩压 (mmHg)',
      dataIndex: 'systolic',
      key: 'systolic',
      sorter: (a, b) => a.systolic - b.systolic,
    },
    {
      title: '舒张压 (mmHg)',
      dataIndex: 'diastolic',
      key: 'diastolic',
      sorter: (a, b) => a.diastolic - b.diastolic,
    },
    {
      title: '状态',
      key: 'status',
      render: (text, record) => {
        const status = evaluateBloodPressure(record.systolic, record.diastolic);
        return (
          <Tag color={bloodPressureColors[status]}>
            {bloodPressureLabels[status]}
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  /**
   * 血糖数据表格列定义
   */
  const bloodGlucoseColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '血糖值 (mmol/L)',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      key: 'status',
      render: (text, record) => {
        const status = evaluateBloodGlucose(record.value, record.type);
        const colorMap = {
          normal: 'success',
          prediabetes: 'warning',
          diabetes: 'error',
          hypoglycemia: 'warning',
          error: 'default'
        };
        const labelMap = {
          normal: '正常',
          prediabetes: '糖尿病前期',
          diabetes: '糖尿病',
          hypoglycemia: '低血糖',
          error: '评估出错'
        };
        return (
          <Tag color={colorMap[status]}>
            {labelMap[status]}
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  /**
   * 血压趋势图配置
   */
  const bloodPressureChartConfig = {
    data: bloodPressureData
      .slice()
      .reverse()
      .map((item) => [
        { date: `${item.date} ${item.time}`, value: item.systolic, category: '收缩压' },
        { date: `${item.date} ${item.time}`, value: item.diastolic, category: '舒张压' },
      ])
      .flat(),
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      title: {
        text: '血压值 (mmHg)',
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    color: ['#ff4d4f', '#1890ff'],
  };

  /**
   * 血糖趋势图配置
   */
  const bloodGlucoseChartConfig = {
    data: bloodGlucoseData
      .slice()
      .reverse()
      .map((item) => ({
        date: `${item.date} ${item.time}`,
        value: item.value,
        category: item.type,
      })),
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      title: {
        text: '血糖值 (mmol/L)',
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return (
    <div className="health-monitoring">
      <Title level={2}>健康数据监测与管理</Title>
      <Text className="page-description">
        记录和管理您的健康数据，掌握健康趋势变化，及时发现潜在健康风险。
      </Text>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="health-monitoring-tabs"
      >
        <TabPane 
          tab={
            <span>
              <HeartOutlined />
              血压管理
            </span>
          } 
          key="1"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card title="录入血压数据" className="data-entry-card">
                <Form
                  form={bloodPressureForm}
                  name="bloodPressureForm"
                  layout="vertical"
                  onFinish={handleBloodPressureSubmit}
                  initialValues={{
                    measureDate: moment(),
                    measureTime: moment(),
                  }}
                >
                  <Form.Item
                    label="收缩压 (mmHg)"
                    name="systolic"
                    rules={[
                      { required: true, message: '请输入收缩压' },
                      { type: 'number', min: 40, max: 250, message: '请输入有效的收缩压数值 (40-250)' },
                    ]}
                  >
                    <Input type="number" prefix={<ColumnHeightOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label="舒张压 (mmHg)"
                    name="diastolic"
                    rules={[
                      { required: true, message: '请输入舒张压' },
                      { type: 'number', min: 30, max: 150, message: '请输入有效的舒张压数值 (30-150)' },
                    ]}
                  >
                    <Input type="number" prefix={<ColumnHeightOutlined />} />
                  </Form.Item>

                  <Form.Item label="测量日期" name="measureDate" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item label="测量时间" name="measureTime" rules={[{ required: true }]}>
                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item label="备注" name="notes">
                    <Input.TextArea rows={2} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      保存数据
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card title="血压趋势" className="trend-chart-card">
                <Line {...bloodPressureChartConfig} />
              </Card>
              
              <Card title="血压数据历史记录" className="data-table-card">
                <Table 
                  columns={bloodPressureColumns} 
                  dataSource={bloodPressureData} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <DashboardOutlined />
              血糖管理
            </span>
          } 
          key="2"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card title="录入血糖数据" className="data-entry-card">
                <Form
                  form={bloodGlucoseForm}
                  name="bloodGlucoseForm"
                  layout="vertical"
                  onFinish={handleBloodGlucoseSubmit}
                  initialValues={{
                    measureDate: moment(),
                    measureTime: moment(),
                    type: '空腹',
                  }}
                >
                  <Form.Item
                    label="血糖值 (mmol/L)"
                    name="value"
                    rules={[
                      { required: true, message: '请输入血糖值' },
                      { type: 'number', min: 1, max: 30, message: '请输入有效的血糖数值 (1-30)' },
                    ]}
                  >
                    <Input type="number" prefix={<DashboardOutlined />} step="0.1" />
                  </Form.Item>

                  <Form.Item label="测量类型" name="type" rules={[{ required: true }]}>
                    <Select>
                      <Option value="空腹">空腹</Option>
                      <Option value="餐后">餐后</Option>
                      <Option value="随机">随机</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="测量日期" name="measureDate" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item label="测量时间" name="measureTime" rules={[{ required: true }]}>
                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item label="备注" name="notes">
                    <Input.TextArea rows={2} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      保存数据
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card title="血糖趋势" className="trend-chart-card">
                <Line {...bloodGlucoseChartConfig} />
              </Card>
              
              <Card title="血糖数据历史记录" className="data-table-card">
                <Table 
                  columns={bloodGlucoseColumns} 
                  dataSource={bloodGlucoseData} 
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ClockCircleOutlined />
              心率管理
            </span>
          } 
          key="3"
        >
          <div className="coming-soon">
            <Title level={3}>功能即将上线</Title>
            <Text>心率管理功能正在开发中，敬请期待！</Text>
          </div>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ScaleOutlined />
              体重管理
            </span>
          } 
          key="4"
        >
          <div className="coming-soon">
            <Title level={3}>功能即将上线</Title>
            <Text>体重管理功能正在开发中，敬请期待！</Text>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring; 