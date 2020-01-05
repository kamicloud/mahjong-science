import cfg from '../constants/cfg'
import groupBy from 'lodash/groupBy'

const INITIAL_STATE: CfgStore = {
  chestMapping: {},
  advGiftBox: [],
  skinBox: [],
  greenGiftBox: [],
  blueGiftBox: [],
  boyBox: [],
  girlBox: [],
  characterArray: [],
  characterMapping: {},
  chestArray: [],
  itemMapping: {},
  skinGroupByCharacterId: {},
  voiceMapping: {},
  skinArray: [],
  fanDescArray: [],
  fanDescMapping: {},
  titleArray: [],
  titleMapping: {}
}

const girlBox = [
  1001,
  1002,
  1003,
  1004,
  1005,
  1006,
  1031,
  1032,
  1043,
  1044,
  1054,
  1055,
  1064,
  1065,
];
const boyBox = [
  1033,
  1034,
  1035,
  1036,
  1066,
  1067,
];

const greenGiftBox = [
  303011,
  303021,
  303031,
  303041,
  303051,
  303061,
  303071,
  303081,

];


const blueGiftBox = [
  303012,
  303022,
  303032,
  303042,
  303052,
  303062,
  303072,
  303082,
];

const advGiftBox = [
  303013,
  303023,
  303033,
  303043,
  303053,
  303063,
  303073,
  303083,
];



export default function cfgReducer(state = INITIAL_STATE, action): CfgStore {
  switch (action.type) {
    case cfg.INIT_CHEST_MAPPING:
      const chestArray = Object.values(action.payload.chestMapping);
      return {
        ...state,
        ...action.payload,
        chestArray: chestArray,
        girlBox,
        boyBox,
        greenGiftBox,
        blueGiftBox,
        advGiftBox,
        skinBox: chestArray.map((chest: MajsoulChest) => chest.id).filter((id) => {
          return (girlBox.indexOf(id) === -1 && boyBox.indexOf(id) === -1) &&
            id !== 1999 && // 许愿石
            id !== 1046 && // 一周年桌布
            id !== 1025 // 新春桌布
            ;
        }),

      }
    case cfg.INIT_VOICE_MAPPING:
      return {
        ...state,
        ...action.payload,
      }
    case cfg.INIT_CHARACTER_MAPPING:
      return {
        ...state,
        ...action.payload,
        characterArray: Object.values(action.payload.characterMapping),
      }
    case cfg.INIT_SKIN_MAPPING:
      const skinArray: MajsoulSkin[] = Object.values(action.payload.skinMapping)
      return {
        ...state,
        skinArray,
        skinGroupByCharacterId: groupBy(skinArray, 'character_id'),
      }
    case cfg.INIT_FAN_DESC_MAPPING:
      return {
        ...state,
        ...action.payload,
        fanDescArray: Object.values(action.payload.fanDescMapping),
      }
    case cfg.INIT_TITLE_MAPPING:
      return {
        ...state,
        ...action.payload,
        titleArray: Object.values(action.payload.titleMapping),
      }
    case cfg.INIT_ITEM_MAPPING:
      return {
        ...state,
        itemMapping: action.payload.itemMapping,
      }
    default:
      return state
  }
}
