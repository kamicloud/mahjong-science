const TILE_LABEL_MAP = [
  '1m',
  '2m',
  '3m',
  '4m',
  '5m',
  '6m',
  '7m',
  '8m',
  '9m',
  '1p',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '1s',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
  '1z',
  '2z',
  '3z',
  '4z',
  '5z',
  '6z',
  '7z',
];

const TILE_MAP = Object.assign({
  'b': 'b',
  'bb': 'b',
  '0m': '0m',
  '0p': '0p',
  '0s': '0s',
}, TILE_LABEL_MAP.reduce((c, tile) => {
  c[tile] = tile;
  return c;
}, {}));

const SHANTEN_LABEL_MAP = [
  '听牌',
  '一向听',
  '两向听',
  '三向听',
  '四向听',
  '五向听',
  '六向听',
  '七向听',
  '八向听',
  '九向听',
  '十向听',
];


export const mapLevelId = (id?: number) => {
  switch (id) {
    case 10601:
    case 20601:
      return '魂天';
    case 10503:
    case 20503:
      return '雀圣三星';
    case 10502:
    case 20502:
      return '雀圣二星';
    case 10501:
    case 20501:
      return '雀圣一星';
    case 10403:
    case 20403:
      return '雀豪三星';
    case 10402:
    case 20402:
      return '雀豪二星';
    case 10401:
    case 20401:
      return '雀豪一星';
    case 10303:
    case 20303:
      return '雀杰三星';
    case 10302:
    case 20302:
      return '雀杰二星';
    case 10301:
    case 20301:
      return '雀杰一星';
    case 10203:
    case 20203:
      return '雀士三星';
    case 10202:
    case 20202:
      return '雀士二星';
    case 10201:
    case 20201:
      return '雀士一星';
    case 10103:
    case 20103:
      return '初心三星';
    case 10102:
    case 20102:
      return '初心二星';
    case 10101:
    case 20101:
      return '初心一星';
  }
}

export default {
  TILE_LABEL_MAP,
  SHANTEN_LABEL_MAP,
  TILE_MAP,
}
