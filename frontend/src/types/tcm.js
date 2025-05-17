/**
 * 中医养生相关类型定义
 */

/**
 * 中医体质类型
 * @readonly
 * @enum {string}
 */
export const TCMConstitutionTypes = {
  BALANCED: 'balanced',       // 平和质
  QI_DEFICIENCY: 'qi_deficiency',       // 气虚质
  YANG_DEFICIENCY: 'yang_deficiency',   // 阳虚质
  YIN_DEFICIENCY: 'yin_deficiency',     // 阴虚质
  PHLEGM_DAMPNESS: 'phlegm_dampness',   // 痰湿质
  DAMP_HEAT: 'damp_heat',               // 湿热质
  BLOOD_STASIS: 'blood_stasis',         // 血瘀质
  QI_DEPRESSION: 'qi_depression',       // 气郁质
  SPECIAL: 'special'                    // 特禀质
};

/**
 * 中医体质类型中文名称
 * @readonly
 * @type {Object.<string, string>}
 */
export const TCMConstitutionLabels = {
  [TCMConstitutionTypes.BALANCED]: '平和质',
  [TCMConstitutionTypes.QI_DEFICIENCY]: '气虚质',
  [TCMConstitutionTypes.YANG_DEFICIENCY]: '阳虚质',
  [TCMConstitutionTypes.YIN_DEFICIENCY]: '阴虚质',
  [TCMConstitutionTypes.PHLEGM_DAMPNESS]: '痰湿质',
  [TCMConstitutionTypes.DAMP_HEAT]: '湿热质',
  [TCMConstitutionTypes.BLOOD_STASIS]: '血瘀质',
  [TCMConstitutionTypes.QI_DEPRESSION]: '气郁质',
  [TCMConstitutionTypes.SPECIAL]: '特禀质'
};

/**
 * 十二经络枚举
 * @readonly
 * @enum {string}
 */
export const Meridians = {
  // 阳经
  LARGE_INTESTINE: 'large_intestine',  // 大肠经
  SMALL_INTESTINE: 'small_intestine',  // 小肠经
  STOMACH: 'stomach',                  // 胃经
  BLADDER: 'bladder',                  // 膀胱经
  GALLBLADDER: 'gallbladder',          // 胆经
  TRIPLE_ENERGIZER: 'triple_energizer', // 三焦经
  
  // 阴经
  LUNG: 'lung',                        // 肺经
  HEART: 'heart',                      // 心经
  SPLEEN: 'spleen',                    // 脾经
  KIDNEY: 'kidney',                    // 肾经
  LIVER: 'liver',                      // 肝经
  PERICARDIUM: 'pericardium'           // 心包经
};

/**
 * 经络中文名称
 * @readonly
 * @type {Object.<string, string>}
 */
export const MeridianLabels = {
  [Meridians.LARGE_INTESTINE]: '手阳明大肠经',
  [Meridians.SMALL_INTESTINE]: '手太阳小肠经',
  [Meridians.STOMACH]: '足阳明胃经',
  [Meridians.BLADDER]: '足太阳膀胱经',
  [Meridians.GALLBLADDER]: '足少阳胆经',
  [Meridians.TRIPLE_ENERGIZER]: '手少阳三焦经',
  [Meridians.LUNG]: '手太阴肺经',
  [Meridians.HEART]: '手少阴心经',
  [Meridians.SPLEEN]: '足太阴脾经',
  [Meridians.KIDNEY]: '足少阴肾经',
  [Meridians.LIVER]: '足厥阴肝经',
  [Meridians.PERICARDIUM]: '手厥阴心包经'
};

/**
 * 经络活跃时间映射（子午流注）
 * @readonly
 * @type {Object.<string, {start: number, end: number}>}
 */
export const MeridianActiveTimeMap = {
  [Meridians.LUNG]: { start: 3, end: 5 },        // 寅时 (3-5点)
  [Meridians.LARGE_INTESTINE]: { start: 5, end: 7 },  // 卯时 (5-7点)
  [Meridians.STOMACH]: { start: 7, end: 9 },     // 辰时 (7-9点)
  [Meridians.SPLEEN]: { start: 9, end: 11 },     // 巳时 (9-11点)
  [Meridians.HEART]: { start: 11, end: 13 },     // 午时 (11-13点)
  [Meridians.SMALL_INTESTINE]: { start: 13, end: 15 }, // 未时 (13-15点)
  [Meridians.BLADDER]: { start: 15, end: 17 },   // 申时 (15-17点)
  [Meridians.KIDNEY]: { start: 17, end: 19 },    // 酉时 (17-19点)
  [Meridians.PERICARDIUM]: { start: 19, end: 21 }, // 戌时 (19-21点)
  [Meridians.TRIPLE_ENERGIZER]: { start: 21, end: 23 }, // 亥时 (21-23点)
  [Meridians.GALLBLADDER]: { start: 23, end: 1 }, // 子时 (23-1点)
  [Meridians.LIVER]: { start: 1, end: 3 }        // 丑时 (1-3点)
};

/**
 * 二十四节气枚举
 * @readonly
 * @enum {string}
 */
export const SolarTerms = {
  BEGINNING_OF_SPRING: 'beginning_of_spring',    // 立春
  RAIN_WATER: 'rain_water',                      // 雨水
  AWAKENING_OF_INSECTS: 'awakening_of_insects',  // 惊蛰
  SPRING_EQUINOX: 'spring_equinox',              // 春分
  CLEAR_AND_BRIGHT: 'clear_and_bright',          // 清明
  GRAIN_RAIN: 'grain_rain',                      // 谷雨
  BEGINNING_OF_SUMMER: 'beginning_of_summer',    // 立夏
  GRAIN_BUDS: 'grain_buds',                      // 小满
  GRAIN_IN_EAR: 'grain_in_ear',                  // 芒种
  SUMMER_SOLSTICE: 'summer_solstice',            // 夏至
  SLIGHT_HEAT: 'slight_heat',                    // 小暑
  GREAT_HEAT: 'great_heat',                      // 大暑
  BEGINNING_OF_AUTUMN: 'beginning_of_autumn',    // 立秋
  ENDING_OF_HEAT: 'ending_of_heat',              // 处暑
  WHITE_DEW: 'white_dew',                        // 白露
  AUTUMN_EQUINOX: 'autumn_equinox',              // 秋分
  COLD_DEW: 'cold_dew',                          // 寒露
  FROST_DESCENT: 'frost_descent',                // 霜降
  BEGINNING_OF_WINTER: 'beginning_of_winter',    // 立冬
  LIGHT_SNOW: 'light_snow',                      // 小雪
  HEAVY_SNOW: 'heavy_snow',                      // 大雪
  WINTER_SOLSTICE: 'winter_solstice',            // 冬至
  SLIGHT_COLD: 'slight_cold',                    // 小寒
  GREAT_COLD: 'great_cold'                       // 大寒
};

/**
 * 节气中文名称
 * @readonly
 * @type {Object.<string, string>}
 */
export const SolarTermLabels = {
  [SolarTerms.BEGINNING_OF_SPRING]: '立春',
  [SolarTerms.RAIN_WATER]: '雨水',
  [SolarTerms.AWAKENING_OF_INSECTS]: '惊蛰',
  [SolarTerms.SPRING_EQUINOX]: '春分',
  [SolarTerms.CLEAR_AND_BRIGHT]: '清明',
  [SolarTerms.GRAIN_RAIN]: '谷雨',
  [SolarTerms.BEGINNING_OF_SUMMER]: '立夏',
  [SolarTerms.GRAIN_BUDS]: '小满',
  [SolarTerms.GRAIN_IN_EAR]: '芒种',
  [SolarTerms.SUMMER_SOLSTICE]: '夏至',
  [SolarTerms.SLIGHT_HEAT]: '小暑',
  [SolarTerms.GREAT_HEAT]: '大暑',
  [SolarTerms.BEGINNING_OF_AUTUMN]: '立秋',
  [SolarTerms.ENDING_OF_HEAT]: '处暑',
  [SolarTerms.WHITE_DEW]: '白露',
  [SolarTerms.AUTUMN_EQUINOX]: '秋分',
  [SolarTerms.COLD_DEW]: '寒露',
  [SolarTerms.FROST_DESCENT]: '霜降',
  [SolarTerms.BEGINNING_OF_WINTER]: '立冬',
  [SolarTerms.LIGHT_SNOW]: '小雪',
  [SolarTerms.HEAVY_SNOW]: '大雪',
  [SolarTerms.WINTER_SOLSTICE]: '冬至',
  [SolarTerms.SLIGHT_COLD]: '小寒',
  [SolarTerms.GREAT_COLD]: '大寒'
};

/**
 * 节气所属季节
 * @readonly
 * @type {Object.<string, string>}
 */
export const SolarTermSeasons = {
  [SolarTerms.BEGINNING_OF_SPRING]: 'spring',
  [SolarTerms.RAIN_WATER]: 'spring',
  [SolarTerms.AWAKENING_OF_INSECTS]: 'spring',
  [SolarTerms.SPRING_EQUINOX]: 'spring',
  [SolarTerms.CLEAR_AND_BRIGHT]: 'spring',
  [SolarTerms.GRAIN_RAIN]: 'spring',
  [SolarTerms.BEGINNING_OF_SUMMER]: 'summer',
  [SolarTerms.GRAIN_BUDS]: 'summer',
  [SolarTerms.GRAIN_IN_EAR]: 'summer',
  [SolarTerms.SUMMER_SOLSTICE]: 'summer',
  [SolarTerms.SLIGHT_HEAT]: 'summer',
  [SolarTerms.GREAT_HEAT]: 'summer',
  [SolarTerms.BEGINNING_OF_AUTUMN]: 'autumn',
  [SolarTerms.ENDING_OF_HEAT]: 'autumn',
  [SolarTerms.WHITE_DEW]: 'autumn',
  [SolarTerms.AUTUMN_EQUINOX]: 'autumn',
  [SolarTerms.COLD_DEW]: 'autumn',
  [SolarTerms.FROST_DESCENT]: 'autumn',
  [SolarTerms.BEGINNING_OF_WINTER]: 'winter',
  [SolarTerms.LIGHT_SNOW]: 'winter',
  [SolarTerms.HEAVY_SNOW]: 'winter',
  [SolarTerms.WINTER_SOLSTICE]: 'winter',
  [SolarTerms.SLIGHT_COLD]: 'winter',
  [SolarTerms.GREAT_COLD]: 'winter'
};

/**
 * 季节中文名称
 * @readonly
 * @type {Object.<string, string>}
 */
export const SeasonLabels = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季'
};

/**
 * 传统养生功法类型
 * @readonly
 * @enum {string}
 */
export const ExerciseTypes = {
  TAI_CHI: 'tai_chi',                  // 太极拳
  EIGHT_SECTION_BROCADE: 'eight_section_brocade', // 八段锦
  FIVE_ANIMAL_PLAY: 'five_animal_play', // 五禽戏
  YI_JIN_JING: 'yi_jin_jing',           // 易筋经
  WU_QIN_XI: 'wu_qin_xi',               // 五禽戏
  MERIDIAN_EXERCISE: 'meridian_exercise' // 经络操
};

/**
 * 传统养生功法中文名称
 * @readonly
 * @type {Object.<string, string>}
 */
export const ExerciseTypeLabels = {
  [ExerciseTypes.TAI_CHI]: '太极拳',
  [ExerciseTypes.EIGHT_SECTION_BROCADE]: '八段锦',
  [ExerciseTypes.FIVE_ANIMAL_PLAY]: '五禽戏',
  [ExerciseTypes.YI_JIN_JING]: '易筋经',
  [ExerciseTypes.WU_QIN_XI]: '五禽戏',
  [ExerciseTypes.MERIDIAN_EXERCISE]: '经络操'
};

/**
 * 获取当前节气
 * @returns {string} 当前节气的键
 */
export function getCurrentSolarTerm() {
  // 由于计算二十四节气需要复杂的天文算法，这里仅做模拟
  // 实际应用中应当接入准确的天文历法API
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  
  // 简化的分配逻辑，仅作演示用
  if (month === 0) {
    return day < 15 ? SolarTerms.SLIGHT_COLD : SolarTerms.GREAT_COLD;
  } else if (month === 1) {
    return day < 15 ? SolarTerms.BEGINNING_OF_SPRING : SolarTerms.RAIN_WATER;
  } else if (month === 2) {
    return day < 15 ? SolarTerms.AWAKENING_OF_INSECTS : SolarTerms.SPRING_EQUINOX;
  } else if (month === 3) {
    return day < 15 ? SolarTerms.CLEAR_AND_BRIGHT : SolarTerms.GRAIN_RAIN;
  } else if (month === 4) {
    return day < 15 ? SolarTerms.BEGINNING_OF_SUMMER : SolarTerms.GRAIN_BUDS;
  } else if (month === 5) {
    return day < 15 ? SolarTerms.GRAIN_IN_EAR : SolarTerms.SUMMER_SOLSTICE;
  } else if (month === 6) {
    return day < 15 ? SolarTerms.SLIGHT_HEAT : SolarTerms.GREAT_HEAT;
  } else if (month === 7) {
    return day < 15 ? SolarTerms.BEGINNING_OF_AUTUMN : SolarTerms.ENDING_OF_HEAT;
  } else if (month === 8) {
    return day < 15 ? SolarTerms.WHITE_DEW : SolarTerms.AUTUMN_EQUINOX;
  } else if (month === 9) {
    return day < 15 ? SolarTerms.COLD_DEW : SolarTerms.FROST_DESCENT;
  } else if (month === 10) {
    return day < 15 ? SolarTerms.BEGINNING_OF_WINTER : SolarTerms.LIGHT_SNOW;
  } else {
    return day < 15 ? SolarTerms.HEAVY_SNOW : SolarTerms.WINTER_SOLSTICE;
  }
}

/**
 * 获取当前活跃的经络
 * @returns {string} 当前活跃经络的键
 */
export function getCurrentActiveMeridian() {
  const now = new Date();
  const hours = now.getHours();
  
  for (const [meridian, timeRange] of Object.entries(MeridianActiveTimeMap)) {
    const { start, end } = timeRange;
    
    // 处理跨日的时间段
    if (start > end) {
      if (hours >= start || hours < end) {
        return meridian;
      }
    } else {
      if (hours >= start && hours < end) {
        return meridian;
      }
    }
  }
  
  // 正常情况下不应该到达这里
  return Meridians.LUNG;
} 