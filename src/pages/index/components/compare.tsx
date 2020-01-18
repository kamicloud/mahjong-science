import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { PlayerMetadata, PlayerExtendedStats } from '../../../../node_modules/amae-koromo/src/data/types/metadata'
import round from 'lodash/round';
import { roundPercent } from '../../../utils/number-util';
import { tap } from '../../../utils/func-util';
import {mapLevelId} from '../../../utils/constants'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PlayerForCompare = {
  room: number,
  playerStats?: any,
  playerExtendedStates?: any,
}

type PageOwnProps = {
  style: object,
  left?: PlayerForCompare,
  right?: PlayerForCompare,
}

const ROOM_LABEL = ['全部', '玉之间', '王座之间']

const style = {
  margin: '0 20px 0 20px',
  width: 'auto',
}
type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Compare {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({}))
class Compare extends Component {

  static options = {
    addGlobalClass: true
  }


  state: PageState = {
  };

  render() {
    const { left, right } = this.props;
    return (
      <View style={this.props.style}>
        {
          left && right && left.playerStats && left.playerExtendedStates && right.playerStats && right.playerExtendedStates ? <View>
            <View className='at-row'>
              <View className='at-col' style={{ textAlign: 'center', ...style }}>左：{left.playerStats.nickname} - {ROOM_LABEL[left.room]}</View>
            </View>
            <View className='at-row'>
              <View className='at-col' style={{ textAlign: 'center', ...style }}>VS</View>
            </View>
            <View className='at-row'>
              <View className='at-col' style={{ textAlign: 'center', ...style }}>右：{right.playerStats.nickname} - {ROOM_LABEL[right.room]}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>段位</View>
              <View className='at-col'>{mapLevelId(left.playerStats.level.id)}</View>
              <View className='at-col'>{mapLevelId(right.playerStats.level.id)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>分数</View>
              <View className='at-col'>{left.playerStats.level.score}</View>
              <View className='at-col'>{right.playerStats.level.score}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>记录场数</View>
              <View className='at-col'>{left.playerStats.count}</View>
              <View className='at-col'>{right.playerStats.count}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>平均顺位</View>
              <View className='at-col'>{round(left.playerStats.avg_rank, 2)}</View>
              <View className='at-col'>{round(right.playerStats.avg_rank, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>和牌率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.和牌率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.和牌率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>放铳率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.放铳率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.放铳率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>自摸率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.自摸率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.自摸率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>和了巡数</View>
              <View className='at-col'>{round(left.playerExtendedStates.和了巡数, 2)}</View>
              <View className='at-col'>{round(right.playerExtendedStates.和了巡数, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>平均打点</View>
              <View className='at-col'>{tap(left.playerExtendedStates.平均打点)}</View>
              <View className='at-col'>{tap(right.playerExtendedStates.平均打点)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>平均铳点</View>
              <View className='at-col'>{tap(left.playerExtendedStates.平均铳点)}</View>
              <View className='at-col'>{tap(right.playerExtendedStates.平均铳点)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>流局率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.流局率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.流局率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>流听率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.流听率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.流听率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>立直率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.立直率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.立直率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>副露率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.副露率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.副露率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>最大连庄</View>
              <View className='at-col'>{tap(left.playerExtendedStates.最大连庄)}</View>
              <View className='at-col'>{tap(right.playerExtendedStates.最大连庄)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>默听率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.默听率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.默听率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>一位率</View>
              <View className='at-col'>{roundPercent(left.playerStats.rank_rates[0], 2)}</View>
              <View className='at-col'>{roundPercent(right.playerStats.rank_rates[0], 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>二位率</View>
              <View className='at-col'>{roundPercent(left.playerStats.rank_rates[1], 2)}</View>
              <View className='at-col'>{roundPercent(right.playerStats.rank_rates[1], 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>三位率</View>
              <View className='at-col'>{roundPercent(left.playerStats.rank_rates[2], 2)}</View>
              <View className='at-col'>{roundPercent(right.playerStats.rank_rates[2], 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>四位率</View>
              <View className='at-col'>{roundPercent(left.playerStats.rank_rates[3], 2)}</View>
              <View className='at-col'>{roundPercent(right.playerStats.rank_rates[3], 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>被飞率</View>
              <View className='at-col'>{roundPercent(left.playerStats.negative_rate, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerStats.negative_rate, 2)}</View>
            </View>
            {/* <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>安定段位</View>
              <View className='at-col'>{PlayerMetadata.estimateStableLevel2(left.playerStats, 12)}</View>
              <View className='at-col'>{PlayerMetadata.estimateStableLevel2(right.playerStats, 12)}</View>
            </View> */}
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>一发率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.一发率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.一发率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>里宝率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.里宝率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.里宝率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>被炸率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.被炸率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.被炸率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>平均被炸点数</View>
              <View className='at-col'>{tap(left.playerExtendedStates.平均被炸点数)}</View>
              <View className='at-col'>{tap(right.playerExtendedStates.平均被炸点数)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>立直后和牌率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.立直后和牌率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.立直后和牌率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>副露后和牌率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.副露后和牌率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.副露后和牌率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>立直后放铳率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.立直后放铳率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.立直后放铳率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>副露后放铳率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.副露后放铳率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.副露后放铳率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>立直后流局率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.立直后流局率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.立直后流局率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>副露后流局率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.副露后流局率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.副露后流局率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>放铳时立直率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.放铳时立直率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.放铳时立直率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>放铳时副露率</View>
              <View className='at-col'>{roundPercent(left.playerExtendedStates.放铳时副露率, 2)}</View>
              <View className='at-col'>{roundPercent(right.playerExtendedStates.放铳时副露率, 2)}</View>
            </View>
            <View className='at-row' style={{ textAlign: 'center', ...style }}>
              <View className='at-col'>平均起手向听</View>
              <View className='at-col'>{round(left.playerExtendedStates.平均起手向听, 2)}</View>
              <View className='at-col'>{round(right.playerExtendedStates.平均起手向听, 2)}</View>
            </View>
          </View> : null
        }

      </View>
    )
  }
}

export default Compare as ComponentClass<PageOwnProps, PageState>
