import _ from 'lodash';


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
}, _.zipObject(TILE_LABEL_MAP, TILE_LABEL_MAP));

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

export default {
  TILE_LABEL_MAP,
  SHANTEN_LABEL_MAP,
  TILE_MAP,
}
