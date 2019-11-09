import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtSearchBar, AtDivider, AtAccordion } from 'taro-ui'
import apis from '../../utils/api';
import { PlayerMetadata } from '../../../node_modules/amae-koromo/src/utils/dataTypes'
import Chart from 'taro-echarts'
import sapk from '../../apis/sapikacu'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
  playerExtendedStates: any,
  playerStats: any,
  searchValue: string,
  playerList: any,
  open: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankPage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({}))
class RankPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '查战绩'
  };

  state: PageState = {
    playerExtendedStates: {

    },
    open: true,
    searchValue: '',
    playerStats: {},
    playerList: [],

  };

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  searchUser(id) {
    this.setState({
      open: false,
    })
    sapk.playerExtendedStats(id, (data) => {
      this.setState({
        playerExtendedStates: Object.assign({}, data),
      })
    })
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/player_extended_stats/${id}?mode=`, (data) => {
      this.setState({
        playerExtendedStates: data,
      })
    })
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/player_stats/${id}?mode=`, (data) => {
      this.setState({
        playerStats: data,
      })
    })
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  percentRender(number: number) {
    return (Math.round(number * 10000) / 100) + '%';
  }

  tap(number) {
    return number
  }

  onGetUserInfo() {
    Taro.login({
      success: ({ code }) => {
        apis.wechat.codeToSession({
          code
        }, (res) => {
          console.log(res)
        })
        console.log(code)
      }
    })
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }

  mapLevelId(id) {
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

  onChange(value) {
    this.setState({
      searchValue: value,
    })
  }

  onActionClick() {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/search_player/${this.state.searchValue}?limit=20`, (data) => {

      this.setState({
        playerList: data,
        open: true,
      })
    })
  }

  render() {
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.searchValue}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
          showActionButton
          placeholder='请先搜索并选择用户'

        />

        <AtAccordion
          open={this.state.open}
          onClick={() => {
            this.setState({
              open: !this.state.open
            })
          }}
          title='搜索结果'
        >
          {
            this.state.playerList.map(player => {
              return <View
                key={player.id}
                onClick={() => {
                  this.searchUser(player.id)
                }} style={{
                  margin: '5px 10px 0 10px',
                  width: 'auto',
                }}
              >{player.nickname}[{this.mapLevelId(player.level.id)}]</View>

            })
          }
        </AtAccordion>

        {/* <Chart
          chartId="1"
          option={{
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }]
          }}
        /> */}
        <AtDivider content='用户数据' />
        {this.state.playerStats.nickname ? <View>

          <View className='at-row' style={{
            textAlign: 'center',
          }}>
            <View className='at-col'>玩家 {this.state.playerStats.nickname}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>当前段位: {this.mapLevelId(this.state.playerStats.level ? this.state.playerStats.level.id : null)}</View>
            <View className='at-col'>分数: {this.state.playerStats.level.score}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>记录场数: {this.state.playerStats.count}</View>
            <View className='at-col'>平均顺位: {Math.round(this.state.playerStats.avg_rank * 100) / 100}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>副露率: {this.percentRender(this.state.playerExtendedStates.副露率)}</View>
            <View className='at-col'>和了巡数: {Math.round(this.state.playerExtendedStates.和了巡数 * 100) / 100}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>和牌率: {this.percentRender(this.state.playerExtendedStates.和牌率)}</View>
            <View className='at-col'>放铳率: {this.percentRender(this.state.playerExtendedStates.放铳率)}</View>
          </View>

          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>平均打点: {Math.round(this.state.playerExtendedStates.平均打点)}</View>
            <View className='at-col'>平均铳点: {Math.round(this.state.playerExtendedStates.平均铳点)}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>流局率: {this.percentRender(this.state.playerExtendedStates.流局率)}</View>
            <View className='at-col'>流听率: {this.percentRender(this.state.playerExtendedStates.流听率)}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>立直率: {this.percentRender(this.state.playerExtendedStates.立直率)}</View>
            <View className='at-col'>自摸率: {this.percentRender(this.state.playerExtendedStates.自摸率)}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>最大连庄: {this.tap(this.state.playerExtendedStates.最大连庄)}</View>
            <View className='at-col'>默听率: {this.percentRender(this.state.playerExtendedStates.默听率)}</View>
          </View>
          <View className='at-row' style={{
            margin: '0 20px 0 20px',
            width: 'auto',
          }}>
            <View className='at-col'>被飞率: {this.percentRender(this.state.playerStats.negative_rate)}</View>
            <View className='at-col'>安定段位：{PlayerMetadata.estimateStableLevel2(this.state.playerStats, 12)}</View>

          </View>
        </View> : null

        }
        {
          this.state.playerStats.rank_rates ? <Chart
            chartId="2"
            option={{
              title: {
                text: '累计战绩',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{b}"
              },
              series: [
                {
                  name: '顺位概率',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    { value: this.state.playerStats.rank_rates[0], name: '一位' + this.percentRender(this.state.playerStats.rank_rates[0]) },
                    { value: this.state.playerStats.rank_rates[1], name: '二位' + this.percentRender(this.state.playerStats.rank_rates[1]) },
                    { value: this.state.playerStats.rank_rates[2], name: '三位' + this.percentRender(this.state.playerStats.rank_rates[2]) },
                    { value: this.state.playerStats.rank_rates[3], name: '四位' + this.percentRender(this.state.playerStats.rank_rates[3]) },
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }}
          /> : null
        }
        <AtDivider content='鸣谢' />
        <View style={{
          textAlign: 'center',
          width: 'auto',
        }}>本页面数据由雀魂牌谱屋提供</View>

      </View>
    )
  }
}

export default RankPage as ComponentClass<PageOwnProps, PageState>
