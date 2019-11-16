import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { mapLevelId } from '../../../utils/rank-util'
import { AtDivider } from 'taro-ui'


export default class Rank2 extends Component {
  static options = {
    addGlobalClass: true
  }

  render () {
    let ranks = this.props.current4 === 0 ? this.props.rank1w : this.props.rank4w
    let room = 0
    if (this.props.current3 === 1) {
      room = 12
    } else if (this.props.current3 === 2) {
      room = 16
    }
    return ranks ? <View

      style={{
        fontSize: '14px',
      }}
    >
      <AtDivider
        content='汪汪榜'
      />
      {
        ranks[room].top.map((rank, index) => {
          return <View
            className='at-row'
            style={{
              margin: '0 10px 0 10px',
              width: 'auto',
            }}
          >
            <View className='at-col'>{index + 1} [{mapLevelId(rank.level.id)}]{rank.nickname}</View>
            <View
              className='at-col'
              style={{
                textAlign: 'right',
              }}
            >{rank.delta}</View>
          </View>
        })
      }
      <AtDivider
        content='苦主榜'
      />
      {
        ranks[room].bottom.map((rank, index) => {
          return <View
            className='at-row'
            style={{
              margin: '0 10px 0 10px',
              width: 'auto',
            }}
          >
            <View className='at-col'>{index + 1} [{mapLevelId(rank.level.id)}]{rank.nickname}</View>
            <View
              className='at-col'
              style={{
                textAlign: 'right',
              }}
            >{rank.delta}</View>
          </View>
        })
      }
    </View> : null
  }
}
