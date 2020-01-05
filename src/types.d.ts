
interface CfgStore {
  advGiftBox: number[],
  skinBox: number[],
  greenGiftBox: number[],
  blueGiftBox: number[],
  boyBox: number[],
  girlBox: number[],

  chestMapping: {[index: number]: MajsoulChest},
  chestArray: MajsoulChest[],
  itemMapping: {[index: number]: MajsoulItem},
  voiceMapping: {[index: number]: MajsoulVoice[]},
  characterMapping: {[index: number]: MajsoulCharacter},
  characterArray: MajsoulCharacter[],
  skinArray: MajsoulSkin[],
  skinGroupByCharacterId: {[index: number]: MajsoulSkin[]},
  fanDescMapping: {[index: number]: MajsoulFanDesc},
  fanDescArray: MajsoulFanDesc[],
  titleMapping: {[index: number]: MajsoulTitle},
  titleArray: MajsoulTitle[],
}

interface MajsoulCharacter {
  id: number,
  name_chs: string,
  name_jp: string,
  name_en: string,
  sex: number,
  desc_stature_chs: number,
  desc_birth_chs: string,
  desc_age_chs: string,
  desc_bloodtype: string,
  desc_cv_chs: string,
  desc_hobby_chs: string,
  desc_chs: string,
  emo: string,
}

interface MajsoulChest {
  id: number,
  name_chs: string,
}

interface MajsoulVoice {
  id: number,
  path: string,
  name_chs: string,
  category: number,
  words_chs: string,
}

interface MajsoulItem {
  id: number,
  name_chs: string,
}

interface MajsoulTitle {
  id: number,
  name_chs: string,
  name_jp: string,
  name_en: string,
  desc_chs: string,
  desc_jp: string,
  desc_en: string,
}

interface MajsoulFanDesc {
  id: number,
  name_chs: string,
  name_jp: string,
  name_en: string,
  case: string,
  tag: number,
  desc_chs: string,
  desc_jp: string,
  desc_en: string,
  desc2_chs: string,
  desc2_jp: string,
  desc2_en: string,
}

interface MajsoulSkin {
  id: number,
  name_chs: string,
  path: string,
  // "id": 400000,
  // "type": 0,
  // "name_chs": "默认皮肤(女)",
  // "name_jp": "デフォルトスキン",
  // "name_en": "Default Look",
  // "desc_chs": "",
  // "desc_jp": "",
  // "desc_en": "",
  // "character_id": 0,
  // "lock_tips_chs": "",
  // "lock_tips_jp": "",
  // "lock_tips_en": "",
  // "path": "extendRes/charactor/default_girl",
  // "exchange_item_id": 302002,
  // "exchange_item_num": 60,
  // "direction": 0,
  // "no_reverse": 0,
  // "full_center_x": 0.5,
  // "half_center_x": 0.5,
  // "full_width": 1620,
  // "full_height": 2804,
  // "full_x": 1201,
  // "full_y": 737,
  // "half_width": 1620,
  // "half_height": 1094,
  // "half_x": 1201,
  // "half_y": 710,
  // "smallhead_width": 0,
  // "smallhead_height": 0,
  // "smallhead_x": 0,
  // "smallhead_y": 0,
  // "face_width": 0,
  // "face_height": 0,
  // "face_x": 0,
  // "face_y": 0
}
