import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabs, AtTabsPane, AtNoticebar, AtTabBar } from 'taro-ui'

import apis from '../../utils/api';
import { RankResponse, Rank, Rank2DTO } from 'src/utils/dtos'
import avatarMapping from '../../../src/utils/avatar-mapping.json'
import Rank2 from './components/rank2';
import { mapLevelId } from '../../utils/rank-util'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  current: number,
  current2: number,
  current3: number,
  current4: number,
  rank3: Rank[],
  rank4: Rank[],
  rank1w: Rank2DTO,
  rank4w: Rank2DTO,
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
    navigationBarTitleText: '排行榜'
  };

  state: PageState = {
    current: 0,
    current2: 0,
    current3: 0,
    current4: 0,
    rank3: [],
    rank4: [],
    rank1w: {
      0: {
        bottom: [],
        top: [],
      },
      12: {
        bottom: [],
        top: [],
      },
      16: {
        bottom: [],
        top: [],
      },
    },
    rank4w: {

      0: {
        bottom: [],
        top: [],
      },
      12: {
        bottom: [],
        top: [],
      },
      16: {
        bottom: [],
        top: [],
      },
    },
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    apis.mahjong.rank({}, (data: RankResponse) => {
      this.setState({
        rank3: data.rank3,
        rank4: data.rank4,
      })
    })
    apis.mahjong.proxy('https://ak-data-2.sapk.ch/api/player_delta_ranking/1w', (data) => {
      console.log(data)
      this.setState({
        rank1w: data,
      })
    })
    apis.mahjong.proxy('https://ak-data-2.sapk.ch/api/player_delta_ranking/4w', (data) => {
      this.setState({
        rank4w: data,
      })
    })
  }

  componentDidShow() {
  }

  componentDidHide() {
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



  render() {
    const tabList = [{ title: 'TOP 100' }, { title: '战绩榜' }]
    return (
      <View className='index'>
        <AtNoticebar marquee>
          TOP100 排行榜同步自雀魂官方，每天凌晨更新数据。战绩排行榜数据来自雀魂牌谱屋。如果遇到页面显示不全请联系作者。
        </AtNoticebar>
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          animated={false}
        >
          <AtTabsPane current={this.state.current} index={0} >
            <AtTabBar
              tabList={[
                { title: '四麻' },
                { title: '三麻' },
              ]}
              onClick={(current2) => { this.setState({ current2 }) }}
              current={this.state.current2}
            />
            <View style={{
              fontSize: '14px',
              marginTop: '5px',
            }}>
              {
                this.state.current2 === 0 ? this.state.rank4.map((rank: Rank, i) => {
                  return <View
                    className='at-row'
                    style={{
                      margin: '0 10px 0 10px',
                      width: 'auto',
                    }}
                  >
                    <Image
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                    />
                    <View className='at-col'>{i + 1} {rank.nickname}</View>
                    <View className='at-col' style={{
                      textAlign: 'center',
                    }}>{mapLevelId(rank.level.id)} {rank.level.score}</View>
                  </View>
                }) : this.state.rank3.map((rank: Rank, i) => {
                  return <View className='at-row' style={{
                    margin: '0 10px 0 10px',
                    width: 'auto',
                  }}>
                    <Image
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                    />
                    <View className='at-col'>{i + 1} {rank.nickname}</View>
                    <View className='at-col' style={{
                      textAlign: 'center',
                    }}>{mapLevelId(rank.level3.id)} {rank.level3.score}</View>
                  </View>
                })
              }

            </View>

          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <AtTabBar
              tabList={[
                { title: '全部' },
                { title: '玉' },
                { title: '王座' },
              ]}
              onClick={(current3) => { this.setState({ current3 }) }}
              current={this.state.current3}
            />
            <AtTabBar
              tabList={[
                { title: '一周' },
                { title: '四周' },
              ]}
              onClick={(current4) => { this.setState({ current4 }) }}
              current={this.state.current4}
            />
            <View>
              <Rank2
                current3={this.state.current3}
                current4={this.state.current4}
                rank1w={this.state.rank1w}
                rank4w={this.state.rank4w}
              />
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default RankPage as ComponentClass<PageOwnProps, PageState>
