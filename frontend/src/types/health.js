/**
 * 健康数据类型定义
 */

/**
 * 血压数据结构
 * @typedef {Object} BloodPressure
 * @property {number} systolic - 收缩压 (mmHg)
 * @property {number} diastolic - 舒张压 (mmHg)
 * @property {string} measureTime - 测量时间 (ISO格式)
 * @property {string} [notes] - 备注信息
 */

/**
 * 血糖数据结构
 * @typedef {Object} BloodGlucose
 * @property {number} value - 血糖值 (mmol/L)
 * @property {('空腹'|'餐后'|'随机')} type - 测量类型
 * @property {string} measureTime - 测量时间 (ISO格式)
 * @property {string} [notes] - 备注信息
 */

/**
 * 心率数据结构
 * @typedef {Object} HeartRate
 * @property {number} value - 心率值 (次/分钟)
 * @property {string} measureTime - 测量时间 (ISO格式)
 * @property {('静息'|'运动'|'其他')} state - 测量时的状态
 * @property {string} [notes] - 备注信息
 */

/**
 * 体重数据结构
 * @typedef {Object} Weight
 * @property {number} value - 体重值 (kg)
 * @property {string} measureTime - 测量时间 (ISO格式)
 * @property {string} [notes] - 备注信息
 */

/**
 * 睡眠数据结构
 * @typedef {Object} Sleep
 * @property {string} startTime - 入睡时间 (ISO格式)
 * @property {string} endTime - 起床时间 (ISO格式)
 * @property {number} duration - 睡眠时长 (分钟)
 * @property {number} [deepSleepDuration] - 深度睡眠时长 (分钟)
 * @property {number} [quality] - 睡眠质量评分 (1-100)
 * @property {string} [notes] - 备注信息
 */

/**
 * 运动数据结构
 * @typedef {Object} Exercise
 * @property {string} type - 运动类型
 * @property {string} startTime - 开始时间 (ISO格式)
 * @property {string} endTime - 结束时间 (ISO格式)
 * @property {number} duration - 运动时长 (分钟)
 * @property {number} [calorie] - 消耗卡路里 (kcal)
 * @property {number} [steps] - 步数
 * @property {string} [notes] - 备注信息
 */

/**
 * 中医体质类型
 * @typedef {('平和质'|'气虚质'|'阳虚质'|'阴虚质'|'痰湿质'|'湿热质'|'血瘀质'|'气郁质'|'特禀质')} TCMConstitution
 */

/**
 * 健康数据类型枚举
 * @readonly
 * @enum {string}
 */
export const HealthDataType = {
  BLOOD_PRESSURE: 'blood_pressure',
  BLOOD_GLUCOSE: 'blood_glucose',
  HEART_RATE: 'heart_rate',
  WEIGHT: 'weight',
  SLEEP: 'sleep',
  EXERCISE: 'exercise'
};

/**
 * 血压状态评估
 * @readonly
 * @enum {string}
 */
export const BloodPressureStatus = {
  NORMAL: 'normal',
  ELEVATED: 'elevated',
  HYPERTENSION_1: 'hypertension_1',
  HYPERTENSION_2: 'hypertension_2',
  HYPERTENSION_CRISIS: 'hypertension_crisis',
  HYPOTENSION: 'hypotension'
};

/**
 * 血糖状态评估
 * @readonly
 * @enum {string}
 */
export const BloodGlucoseStatus = {
  NORMAL: 'normal',
  PREDIABETES: 'prediabetes',
  DIABETES: 'diabetes',
  HYPOGLYCEMIA: 'hypoglycemia'
};

/**
 * 根据血压值评估状态
 * @param {number} systolic - 收缩压
 * @param {number} diastolic - 舒张压
 * @returns {string} 血压状态
 */
export function evaluateBloodPressure(systolic, diastolic) {
  try {
    if (systolic < 90 || diastolic < 60) {
      return BloodPressureStatus.HYPOTENSION;
    } else if (systolic >= 180 || diastolic >= 120) {
      return BloodPressureStatus.HYPERTENSION_CRISIS;
    } else if (systolic >= 140 || diastolic >= 90) {
      return BloodPressureStatus.HYPERTENSION_2;
    } else if (systolic >= 130 || diastolic >= 80) {
      return BloodPressureStatus.HYPERTENSION_1;
    } else if (systolic >= 120 && diastolic < 80) {
      return BloodPressureStatus.ELEVATED;
    } else {
      return BloodPressureStatus.NORMAL;
    }
  } catch (error) {
    console.error('血压评估出错:', error);
    return 'error';
  }
}

/**
 * 根据空腹血糖值评估状态
 * @param {number} value - 血糖值
 * @param {string} type - 测量类型
 * @returns {string} 血糖状态
 */
export function evaluateBloodGlucose(value, type) {
  try {
    if (type === '空腹') {
      if (value < 3.9) {
        return BloodGlucoseStatus.HYPOGLYCEMIA;
      } else if (value <= 6.1) {
        return BloodGlucoseStatus.NORMAL;
      } else if (value <= 7.0) {
        return BloodGlucoseStatus.PREDIABETES;
      } else {
        return BloodGlucoseStatus.DIABETES;
      }
    } else if (type === '餐后') {
      if (value < 3.9) {
        return BloodGlucoseStatus.HYPOGLYCEMIA;
      } else if (value <= 7.8) {
        return BloodGlucoseStatus.NORMAL;
      } else if (value <= 11.1) {
        return BloodGlucoseStatus.PREDIABETES;
      } else {
        return BloodGlucoseStatus.DIABETES;
      }
    } else {
      // 随机血糖评估
      if (value < 3.9) {
        return BloodGlucoseStatus.HYPOGLYCEMIA;
      } else if (value <= 7.8) {
        return BloodGlucoseStatus.NORMAL;
      } else if (value <= 11.1) {
        return BloodGlucoseStatus.PREDIABETES;
      } else {
        return BloodGlucoseStatus.DIABETES;
      }
    }
  } catch (error) {
    console.error('血糖评估出错:', error);
    return 'error';
  }
} 