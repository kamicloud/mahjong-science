import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import React from 'react';
import constants from '../../../utils/constants'

let bigImagePath = (index: number) => {
  return 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/' +
    constants.TILE_MAP[index] +
    '.gif'
};

export default (props) => {
  return <View style={{
    flex: 1,
    display: 'flex',
    marginLeft: '5px',
  }}>
    {
      props.tiles ? props.tiles.map((tile) => {
          return <Image
            mode='aspectFit'
            style={{
              width: '20px',
              height: '50px',
            }}
            src={bigImagePath(tile)}
          />
        }) : null
    }
  </View>
}
