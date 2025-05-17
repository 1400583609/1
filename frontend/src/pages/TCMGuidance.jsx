import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Collapse, 
  Tag, 
  Button, 
  Divider,
  Image,
  List,
  Space,
  Alert
} from 'antd';
import { 
  ClockCircleOutlined, 
  CalendarOutlined, 
  ExperimentOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { 
  Meridians, 
  MeridianLabels, 
  MeridianActiveTimeMap,
  SolarTerms,
  SolarTermLabels,
  SolarTermSeasons,
  SeasonLabels,
  ExerciseTypes,
  ExerciseTypeLabels,
  getCurrentSolarTerm,
  getCurrentActiveMeridian
} from '../types/tcm';
import '../styles/TCMGuidance.scss';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

// 经络图片映射 (实际应用中应使用真实图片路径)
const MERIDIAN_IMAGES = {
  [Meridians.LUNG]: 'https://via.placeholder.com/400x600?text=肺经',
  [Meridians.LARGE_INTESTINE]: 'https://via.placeholder.com/400x600?text=大肠经',
  [Meridians.STOMACH]: 'https://via.placeholder.com/400x600?text=胃经',
  [Meridians.SPLEEN]: 'https://via.placeholder.com/400x600?text=脾经',
  [Meridians.HEART]: 'https://via.placeholder.com/400x600?text=心经',
  [Meridians.SMALL_INTESTINE]: 'https://via.placeholder.com/400x600?text=小肠经',
  [Meridians.BLADDER]: 'https://via.placeholder.com/400x600?text=膀胱经',
  [Meridians.KIDNEY]: 'https://via.placeholder.com/400x600?text=肾经',
  [Meridians.PERICARDIUM]: 'https://via.placeholder.com/400x600?text=心包经',
  [Meridians.TRIPLE_ENERGIZER]: 'https://via.placeholder.com/400x600?text=三焦经',
  [Meridians.GALLBLADDER]: 'https://via.placeholder.com/400x600?text=胆经',
  [Meridians.LIVER]: 'https://via.placeholder.com/400x600?text=肝经'
};

// 模拟的经络穴位数据
const MERIDIAN_ACUPOINTS = {
  [Meridians.LUNG]: [
    { name: '中府', description: '肺经的第一个穴位，位于胸部', benefits: '宣肺理气，降逆止咳' },
    { name: '云门', description: '位于胸前，锁骨下窝中', benefits: '宣肺利气，通调水道' },
    { name: '太渊', description: '位于手腕横纹桡侧', benefits: '清泻肺热，调和营卫' },
    { name: '列缺', description: '位于桡骨茎突上方', benefits: '疏风清热，通络止痛' },
    { name: '鱼际', description: '位于大拇指根部', benefits: '清肺降火，利咽开音' }
  ],
  [Meridians.LARGE_INTESTINE]: [
    { name: '商阳', description: '位于食指末节桡侧', benefits: '清热解表，通经活络' },
    { name: '合谷', description: '位于第一、第二掌骨之间', benefits: '疏风解表，调和气血' },
    { name: '曲池', description: '位于肘横纹外端', benefits: '清热解表，通经活络' },
    { name: '阳溪', description: '位于腕背横纹桡侧', benefits: '疏风清热，活络止痛' },
    { name: '手三里', description: '位于前臂外侧', benefits: '通经活络，调和气血' }
  ],
  // 其他经络穴位数据
};

// 节气养生建议
const SOLAR_TERM_ADVICE = {
  [SolarTerms.BEGINNING_OF_SPRING]: {
    overview: '立春时节，阳气开始上升，万物复苏，养生重在"养阳护肝"。',
    diet: [
      '宜: 温补食物，如韭菜、春笋、豆芽等清新食物',
      '忌: 过于辛辣刺激食物，以免耗伤阳气'
    ],
    activities: [
      '适当晨练，早睡早起',
      '进行舒缓的伸展运动',
      '多到户外呼吸新鲜空气'
    ],
    precautions: '注意保暖，预防感冒；保持心情舒畅，不要过度劳累。'
  },
  [SolarTerms.RAIN_WATER]: {
    overview: '雨水时节，气温回升，降水增多，养生重在"调肝护脾"。',
    diet: [
      '宜: 清淡食物，如新鲜蔬菜、薏米粥',
      '忌: 过于油腻和寒性食物'
    ],
    activities: [
      '适当运动，增强体质',
      '保持室内通风',
      '规律作息，避免熬夜'
    ],
    precautions: '注意防潮，预防关节疾病；保持心情愉快，避免情绪波动。'
  },
  // 其他节气养生建议
};

// 传统运动内容
const TRADITIONAL_EXERCISES = {
  [ExerciseTypes.TAI_CHI]: {
    name: '太极拳',
    description: '太极拳是一种柔和缓慢的中国传统拳法，既是武术，也是极好的健身运动。通过柔缓的动作，达到调和阴阳、行气活血的功效。',
    benefits: [
      '增强心肺功能',
      '提高平衡能力',
      '舒缓精神压力',
      '增强肌肉韧性',
      '改善关节灵活度'
    ],
    steps: [
      '预备式：两脚开立与肩同宽，膝微屈，全身放松',
      '起式：两臂缓慢上抬至胸前',
      '左右野马分鬃：身体重心左右移动，双手如分马鬃',
      '白鹤亮翅：提一腿，双臂如鹤展翅',
      '搂膝拗步：弓步下蹲，一手搂膝'
    ],
    videoUrl: 'https://example.com/taichi-video'
  },
  [ExerciseTypes.EIGHT_SECTION_BROCADE]: {
    name: '八段锦',
    description: '八段锦是一种流传久远的中国传统健身气功，由八个动作组成，每个动作都有特定的健身作用。',
    benefits: [
      '疏通经络',
      '调和气血',
      '强壮筋骨',
      '改善内脏功能',
      '增强免疫力'
    ],
    steps: [
      '两手托天理三焦：两臂上举，调理三焦',
      '左右开弓似射雕：左右开弓，增强肺部功能',
      '调理脾胃须单举：单臂上举，调理脾胃',
      '五劳七伤往后瞧：向后转头，缓解疲劳',
      '摇头摆尾去心火：摇头摆尾，消除心火',
      '两手攀足固肾腰：弯腰触足，固肾强腰',
      '攒拳怒目增气力：握拳瞪目，增强气力',
      '背后七颠百病消：踮脚跺地，去除百病'
    ],
    videoUrl: 'https://example.com/baduanjin-video'
  },
  // 其他传统运动内容
};

/**
 * 中医养生指导组件
 */
const TCMGuidance = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedMeridian, setSelectedMeridian] = useState(getCurrentActiveMeridian());
  const [currentSolarTerm, setCurrentSolarTerm] = useState(getCurrentSolarTerm());
  const [selectedExercise, setSelectedExercise] = useState(ExerciseTypes.TAI_CHI);
  
  // 初始化时获取当前经络和节气
  useEffect(() => {
    const meridian = getCurrentActiveMeridian();
    const solarTerm = getCurrentSolarTerm();
    
    setSelectedMeridian(meridian);
    setCurrentSolarTerm(solarTerm);
    
    // 每小时更新当前经络
    const intervalId = setInterval(() => {
      setSelectedMeridian(getCurrentActiveMeridian());
    }, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  /**
   * 渲染经络养生内容
   */
  const renderMeridianGuidance = () => {
    return (
      <div className="meridian-guidance">
        <Row className="current-meridian-alert" justify="center">
          <Col span={24}>
            <Alert
              message={
                <span>
                  <ClockCircleOutlined /> 当前时辰活跃经络: 
                  <Tag color="blue" className="current-meridian-tag">
                    {MeridianLabels[selectedMeridian]} 
                    ({MeridianActiveTimeMap[selectedMeridian].start}:00-{MeridianActiveTimeMap[selectedMeridian].end}:00)
                  </Tag>
                </span>
              }
              type="info"
              showIcon={false}
            />
          </Col>
        </Row>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="十二经络导航" className="meridian-nav-card">
              <div className="meridian-groups">
                <div className="meridian-group">
                  <Title level={5}>阳经</Title>
                  <Space wrap>
                    {[
                      Meridians.LARGE_INTESTINE,
                      Meridians.SMALL_INTESTINE,
                      Meridians.STOMACH,
                      Meridians.BLADDER,
                      Meridians.GALLBLADDER,
                      Meridians.TRIPLE_ENERGIZER
                    ].map(meridian => (
                      <Tag 
                        key={meridian}
                        color={selectedMeridian === meridian ? "blue" : "default"}
                        className="meridian-tag"
                        onClick={() => setSelectedMeridian(meridian)}
                      >
                        {MeridianLabels[meridian]}
                      </Tag>
                    ))}
                  </Space>
                </div>
                
                <Divider />
                
                <div className="meridian-group">
                  <Title level={5}>阴经</Title>
                  <Space wrap>
                    {[
                      Meridians.LUNG,
                      Meridians.HEART,
                      Meridians.SPLEEN,
                      Meridians.KIDNEY,
                      Meridians.LIVER,
                      Meridians.PERICARDIUM
                    ].map(meridian => (
                      <Tag 
                        key={meridian}
                        color={selectedMeridian === meridian ? "blue" : "default"}
                        className="meridian-tag"
                        onClick={() => setSelectedMeridian(meridian)}
                      >
                        {MeridianLabels[meridian]}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </div>
              
              <Divider />
              
              <Paragraph className="meridian-intro">
                <InfoCircleOutlined /> 经络是人体内气血运行的通道，主要有十二正经，十二经络遍布全身，沟通脏腑肌肤。
                按时辰养生法（子午流注）认为，每天不同时辰有不同经络当令，养生当顺应此规律。
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} lg={16}>
            <Card 
              title={MeridianLabels[selectedMeridian]} 
              className="meridian-detail-card"
              extra={
                <Text className="active-time">
                  <ClockCircleOutlined /> 当令时辰: {MeridianActiveTimeMap[selectedMeridian].start}:00-{MeridianActiveTimeMap[selectedMeridian].end}:00
                </Text>
              }
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <div className="meridian-image">
                    <Image
                      src={MERIDIAN_IMAGES[selectedMeridian]}
                      alt={MeridianLabels[selectedMeridian]}
                      className="meridian-path-image"
                    />
                  </div>
                </Col>
                
                <Col xs={24} md={12}>
                  <div className="meridian-info">
                    <Title level={4}>主要穴位</Title>
                    
                    {MERIDIAN_ACUPOINTS[selectedMeridian] ? (
                      <List
                        itemLayout="vertical"
                        dataSource={MERIDIAN_ACUPOINTS[selectedMeridian]}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              title={item.name}
                              description={item.description}
                            />
                            <div className="acupoint-benefits">
                              <Text type="secondary">功效: {item.benefits}</Text>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Text>暂无穴位数据</Text>
                    )}
                    
                    <Divider />
                    
                    <Title level={4}>保健方法</Title>
                    <Paragraph>
                      <ul>
                        <li>定期按摩经络上的穴位，可以疏通气血</li>
                        <li>经络当令时辰是保健最佳时间</li>
                        <li>保持情绪平稳，避免过度劳累</li>
                        <li>根据体质和季节选择合适的食物</li>
                      </ul>
                    </Paragraph>
                    
                    <Button type="primary" className="learn-more-btn">
                      查看详细按摩手法 <ArrowRightOutlined />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  /**
   * 渲染节气养生内容
   */
  const renderSolarTermGuidance = () => {
    const currentTerm = SOLAR_TERM_ADVICE[currentSolarTerm] || {};
    const currentSeason = SolarTermSeasons[currentSolarTerm];
    
    return (
      <div className="solar-term-guidance">
        <Row className="current-term-alert" justify="center">
          <Col span={24}>
            <Alert
              message={
                <span>
                  <CalendarOutlined /> 当前节气: 
                  <Tag color="green" className="current-term-tag">
                    {SolarTermLabels[currentSolarTerm]} ({SeasonLabels[currentSeason]})
                  </Tag>
                </span>
              }
              type="info"
              showIcon={false}
            />
          </Col>
        </Row>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="二十四节气" className="solar-term-nav-card">
              <div className="season-groups">
                {['spring', 'summer', 'autumn', 'winter'].map(season => (
                  <div key={season} className="season-group">
                    <Title level={5}>{SeasonLabels[season]}</Title>
                    <Space wrap>
                      {Object.entries(SolarTerms)
                        .filter(([_, term]) => SolarTermSeasons[term] === season)
                        .map(([key, term]) => (
                          <Tag 
                            key={key}
                            color={currentSolarTerm === term ? "green" : "default"}
                            className="solar-term-tag"
                            onClick={() => setCurrentSolarTerm(term)}
                          >
                            {SolarTermLabels[term]}
                          </Tag>
                        ))}
                    </Space>
                  </div>
                ))}
              </div>
              
              <Divider />
              
              <Paragraph className="solar-term-intro">
                <InfoCircleOutlined /> 二十四节气是中国古代订立的一种用来指导农事的补充历法，也是中华民族总结的节令养生宝典。
                它将一年划分为二十四个节气，反映了一年中时令、气候、物候等方面的变化规律。
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} lg={16}>
            <Card 
              title={SolarTermLabels[currentSolarTerm] + "养生指南"} 
              className="solar-term-detail-card"
              extra={
                <Text className="season-badge">
                  <CalendarOutlined /> {SeasonLabels[currentSeason]}
                </Text>
              }
            >
              {currentTerm ? (
                <div className="solar-term-content">
                  <div className="term-overview">
                    <Title level={4}>节气特点</Title>
                    <Paragraph>{currentTerm.overview}</Paragraph>
                  </div>
                  
                  <Divider />
                  
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12}>
                      <Card 
                        title={<><MedicineBoxOutlined /> 饮食调养</>} 
                        className="term-advice-card"
                        bordered={false}
                      >
                        <ul>
                          {currentTerm.diet?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Card 
                        title={<><ExperimentOutlined /> 起居调摄</>} 
                        className="term-advice-card"
                        bordered={false}
                      >
                        <ul>
                          {currentTerm.activities?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Divider />
                  
                  <div className="term-precautions">
                    <Title level={4}>养生要点</Title>
                    <Paragraph>{currentTerm.precautions}</Paragraph>
                  </div>
                  
                  <Button type="primary" className="learn-more-btn">
                    查看推荐药膳食谱 <ArrowRightOutlined />
                  </Button>
                </div>
              ) : (
                <div className="no-data">暂无该节气养生数据</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  /**
   * 渲染传统运动内容
   */
  const renderTraditionalExercises = () => {
    const exerciseData = TRADITIONAL_EXERCISES[selectedExercise] || {};
    
    return (
      <div className="traditional-exercises">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="传统养生功法" className="exercise-nav-card">
              <div className="exercise-list">
                {Object.entries(ExerciseTypes).map(([key, type]) => (
                  <Button
                    key={key}
                    type={selectedExercise === type ? "primary" : "default"}
                    className="exercise-button"
                    onClick={() => setSelectedExercise(type)}
                    block
                  >
                    {ExerciseTypeLabels[type]}
                  </Button>
                ))}
              </div>
              
              <Divider />
              
              <Paragraph className="exercise-intro">
                <InfoCircleOutlined /> 中国传统养生功法历史悠久，融合了导引、吐纳、气功等多种修炼方式，
                既能强健体魄，又能调和气血，达到身心和谐的健康状态。这些功法动作缓和，适合老年人日常锻炼。
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} lg={16}>
            <Card 
              title={exerciseData.name || ''} 
              className="exercise-detail-card"
            >
              {exerciseData ? (
                <div className="exercise-content">
                  <div className="exercise-description">
                    <Title level={4}>功法介绍</Title>
                    <Paragraph>{exerciseData.description}</Paragraph>
                  </div>
                  
                  <Divider />
                  
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Title level={4}>健康功效</Title>
                      <ul className="benefits-list">
                        {exerciseData.benefits?.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <div className="video-placeholder">
                        <div className="placeholder-content">
                          点击播放{exerciseData.name}教学视频
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <Divider />
                  
                  <div className="exercise-steps">
                    <Title level={4}>基本动作要领</Title>
                    <Collapse accordion>
                      {exerciseData.steps?.map((step, index) => (
                        <Panel header={`第${index + 1}式: ${step.split(':')[0]}`} key={index}>
                          <p>{step}</p>
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                  
                  <Divider />
                  
                  <div className="practice-tips">
                    <Title level={4}>练习建议</Title>
                    <ul>
                      <li>初学者可每日练习15-20分钟，熟练后可延长至30分钟</li>
                      <li>清晨或傍晚是练习的最佳时间</li>
                      <li>练习前应适当热身，放松身心</li>
                      <li>动作要缓慢、均匀、轻柔，呼吸自然</li>
                      <li>有心脏病、高血压等慢性疾病者请咨询医生后再练习</li>
                    </ul>
                  </div>
                  
                  <Button type="primary" className="learn-more-btn">
                    查看详细教程 <ArrowRightOutlined />
                  </Button>
                </div>
              ) : (
                <div className="no-data">暂无该功法数据</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  return (
    <div className="tcm-guidance">
      <Title level={2}>中医养生指导</Title>
      <Text className="page-description">
        融合传统中医理念，提供经络养生、节气养生和传统运动指导，助您平衡阴阳、调和气血，实现身心健康。
      </Text>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="tcm-tabs"
      >
        <TabPane 
          tab={<span><ClockCircleOutlined /> 经络养生</span>} 
          key="1"
        >
          {renderMeridianGuidance()}
        </TabPane>
        
        <TabPane 
          tab={<span><CalendarOutlined /> 节气养生</span>} 
          key="2"
        >
          {renderSolarTermGuidance()}
        </TabPane>
        
        <TabPane 
          tab={<span><ExperimentOutlined /> 传统运动</span>} 
          key="3"
        >
          {renderTraditionalExercises()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TCMGuidance; 