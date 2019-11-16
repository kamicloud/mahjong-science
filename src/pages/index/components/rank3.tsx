import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { mapLevelIdShort } from '../../../utils/rank-util'

export default class Rank3 extends Component {
  static options = {
    addGlobalClass: true
  }

  render () {
    return <View>
      {
        this.props.ranks ? this.props.ranks.map((rank, index) => {
          return <View
            className='at-row'
            style={{
              margin: '0 10px 0 10px',
              width: 'auto',
            }}
          >
            <View className='at-col'>{index + 1} [{mapLevelIdShort(rank.level.id)}]{rank.nickname}</View>
            <View
              className='at-col'
              style={{
                textAlign: 'right',
              }}
            >{Math.round(rank.rank_key * 10000) / 100}%({rank.count})</View>
          </View>
        }) : null
      }
    </View>
  }
}




