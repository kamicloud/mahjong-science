import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { mapLevelId } from '../../../utils/rank-util'
import 'taro-ui/dist/style/index.scss' // 引入组件样式 - 方式一
import { AtDivider } from 'taro-ui'

export default (props) => {
  let ranks = props.current4 === 0 ? props.rank1w : props.rank4w
  let room = 0
  if (props.current3 === 1) {
    room = 12
  } else if (props.current3 === 2) {
    room = 16
  }
  return ranks ? <View

    style={{
      fontSize: '14px',
      margin: '5px 20px 0 20px',
    }}
  >
    <AtDivider
      content='汪汪榜'
    />
    {
      ranks[room].top.map((rank) => {
        return <View className='at-row' style={{
          margin: '0 10px 0 10px',
          width: 'auto',
        }}>
          <View className='at-col'>[{mapLevelId(rank.level.id)}]{rank.nickname}</View>
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
      ranks[room].bottom.map((rank) => {
        return <View className='at-row' style={{
          margin: '0 10px 0 10px',
          width: 'auto',
        }}>
          <View className='at-col'>[{mapLevelId(rank.level.id)}]{rank.nickname}</View>
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
