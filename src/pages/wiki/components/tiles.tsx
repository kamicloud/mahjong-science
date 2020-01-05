import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import chunk from 'lodash/chunk'
import constants from '../../../utils/constants'

let bigImagePath = (index: number) => {
  return 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/' +
    constants.TILE_MAP[index] +
    '.gif'
};

const tilesStyle = {
  flex: 1,
  display: 'flex',
  marginLeft: '5px',
}

export default (props) => {
  const tileses = props.case ? props.case.split('|').map((tile) => {
    tile = tile.replace(/b/ig, 'bb')
    return chunk(tile, 2).map((tiles) => {
      return tiles.join('')
    })
  }) : [];
  return <View style={{
    flexDirection: 'row',
    height: '50px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <View style={tilesStyle}></View>
    {
      tileses.map((tiles) => {
        return <View style={tilesStyle}>
          {
            tiles.map((tile) => {
              return <Image
                mode='aspectFit'
                style={{
                  width: '20px',
                  height: '50px',
                  justifyContent: 'center',
                }}
                src={bigImagePath(tile)}
              />
            })
          }
        </View>
      })
    }
    <View style={tilesStyle}></View>

  </View>
}
